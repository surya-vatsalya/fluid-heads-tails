export const getContainerId = () => {
    let isNew = false;
    if (window.location.hash.length === 0) {
        isNew = true;
        window.location.hash = Date.now().toString();
    }
    const id = window.location.hash.substring(1);
    return { id, isNew };
};
