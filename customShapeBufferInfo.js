//custom shapes
//

function createCrrotVertices(
    radius,
    subdivisionsAxis,
    subdivisionsHeight,
    opt_startLatitudeInRadians,
    opt_endLatitudeInRadians,
    opt_startLongitudeInRadians,
    opt_endLongitudeInRadians) {
    if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
        throw Error('subdivisionAxis and subdivisionHeight must be > 0');
    }

    opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
    opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
    opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
    opt_endLongitudeInRadians = opt_endLongitudeInRadians || (Math.PI * 2);

    const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
    const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;

    // We are going to generate our sphere by iterating through its
    // spherical coordinates and generating 2 triangles for each quad on a
    // ring of the sphere.
    const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
    const positions = webglUtils.createAugmentedTypedArray(3, numVertices);
    const normals = webglUtils.createAugmentedTypedArray(3, numVertices);
    const texCoords = webglUtils.createAugmentedTypedArray(2, numVertices);

    // Generate the individual vertices in our vertex buffer.
    for (let y = 0; y <= subdivisionsHeight; y++) {
        for (let x = 0; x <= subdivisionsAxis; x++) {
            // Generate a vertex based on its spherical coordinates
            const u = x / subdivisionsAxis;
            const v = y / subdivisionsHeight;
            const theta = longRange * u;
            const phi = latRange * v;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            const ux = cosTheta * sinPhi;
            const uy = cosPhi;
            const uz = sinTheta * sinPhi;
            positions.push(radius * ux, radius * uy, radius * uz);
            normals.push(ux, uy, uz);
            texCoords.push(1 - u, v);
        }
    }

    const numVertsAround = subdivisionsAxis + 1;
    const indices = webglUtils.createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
    for (let x = 0; x < subdivisionsAxis; x++) {
        for (let y = 0; y < subdivisionsHeight; y++) {
            // Make triangle 1 of quad.
            indices.push(
                (y + 0) * numVertsAround + x,
                (y + 0) * numVertsAround + x + 1,
                (y + 1) * numVertsAround + x);

            // Make triangle 2 of quad.
            indices.push(
                (y + 1) * numVertsAround + x,
                (y + 0) * numVertsAround + x + 1,
                (y + 1) * numVertsAround + x + 1);
        }
    }

    return {
        position: positions,
        normal: normals,
        texcoord: texCoords,
        indices: indices,
    };
}
//end custom shape
//
function createFlattenedFunc(vertFunc) {

    let vertices = vertFunc;
    vertices = deindexVertices(vertices);
    vertices = makeRandomVertexColors(vertices, {
        vertsPerColor: 6,
        rand: function (ndx, channel) {
            //return channel < 3 ? ((128 + Math.random() * 128) | 0) : 255;
            return channel < 3 ? ((220 + Math.random() * 35) | 0) : 255;
        },
    });
    return webglUtils.createBufferInfoFromArrays(gl, vertices);

}

function deindexVertices(vertices) {
    const indices = vertices.indices;
    const newVertices = {};
    const numElements = indices.length;

    function expandToUnindexed(channel) {
        const srcBuffer = vertices[channel];
        const numComponents = srcBuffer.numComponents;
        const dstBuffer = webglUtils.createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
        for (let ii = 0; ii < numElements; ++ii) {
            const ndx = indices[ii];
            const offset = ndx * numComponents;
            for (let jj = 0; jj < numComponents; ++jj) {
                dstBuffer.push(srcBuffer[offset + jj]);
            }
        }
        newVertices[channel] = dstBuffer;
    }

    Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);

    return newVertices;
}

function allButIndices(name) {
    return name !== 'indices';
}

function makeRandomVertexColors(vertices, options) {
    options = options || {};
    const numElements = vertices.position.numElements;
    const vcolors = webglUtils.createAugmentedTypedArray(4, numElements, Uint8Array);
    const rand = options.rand || function (ndx, channel) {
        return channel < 3 ? randInt(256) : 255;
    };
    vertices.color = vcolors;
    if (vertices.indices) {
        // just make random colors if index
        for (let ii = 0; ii < numElements; ++ii) {
            vcolors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
        }
    } else {
        // make random colors per triangle
        const numVertsPerColor = options.vertsPerColor || 3;
        const numSets = numElements / numVertsPerColor;
        for (let ii = 0; ii < numSets; ++ii) {
            const color = [rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3)];
            for (let jj = 0; jj < numVertsPerColor; ++jj) {
                vcolors.push(color);
            }
        }
    }
    return vertices;
}

