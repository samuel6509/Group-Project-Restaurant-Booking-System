export const hasPermission = (permission, permissions = []) => {
    // Handle case when permissions is null or undefined
    if (!permissions) return false;

    // Handle super-admin case (if you have this role)
    if (permissions.includes("super-admin")) return true;

    // Check for specific permission
    return permissions.includes(permission);
};
