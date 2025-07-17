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
