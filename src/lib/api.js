export async function getUsers() {
    const response = await fetch('https://directus.bryanmedin4.com/items/Usuario');
    const { data } = await response.json();
    return data;
}

export async function getUser(id) {
    const response = await fetch(`https://directus.bryanmedin4.com/items/Usuario/${id}`);
    const { data } = await response.json();
    return data;
}

export async function getCiudades() {
    const response = await fetch('https://directus.bryanmedin4.com/items/Ciudad');
    const { data } = await response.json();
    return data;
}

export async function getReglasPicoYPlaca() {
    const response = await fetch('https://directus.bryanmedin4.com/items/Regla_Pico_y_Placa');
    const { data } = await response.json();
    return data;
}

export async function createReglaPicoYPlaca(data) {
    const response = await fetch('https://directus.bryanmedin4.com/items/Regla_Pico_y_Placa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const { data: newRule } = await response.json();
    return newRule;
}

export async function createUsuario(data) {
    const response = await fetch('https://directus.bryanmedin4.com/items/Usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const { data: newUser } = await response.json();
    return newUser;
}

export async function getVehiculos() {
    const response = await fetch('https://directus.bryanmedin4.com/items/Vehiculo');
    const { data } = await response.json();
    return data;
}

export async function createVehiculo(data) {
    const response = await fetch('https://directus.bryanmedin4.com/items/Vehiculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const { data: newVehiculo } = await response.json();
    return newVehiculo;
}