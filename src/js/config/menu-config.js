const fullMenus = [{
    title: '首页',
    key: 'Home',
    icon: 'icon-monitor'
}, ];

const getMenus = function(menuIdList = []) {
    return fullMenus;
    // return getAuthMenu(fullMenus, menuIdList);
};

let getAuthMenu = (menus, menuIdList) => {
    let configMenu = [];
    for (let menu of menus) {
        let m = Utils.copy(menu);
        if (menuIdList.indexOf(m.key) > -1) {
            configMenu.push(m);
        }
        if (menu.children && menu.children.length) {
            m.children = getAuthMenu(menu.children, menuIdList);
        }
    }
    return configMenu;
};

const getKeys = function(menus) {
    let keys = [];
    for (let menu of menus) {
        keys.push(menu.key);
        if (menu.children && menu.children.length) {
            keys.push(...getKeys(menu.children));
        }
    }
    return keys;
};

let fullMenuKeys = getKeys(fullMenus);

const isAuthPage = function(name) {
    return true;
    let menus = G.get('SYS_MENUS') || [];
    if (fullMenuKeys.indexOf(name) > -1 && menus.indexOf(name) == -1) {
        return false;
    }
    return true;
};

export { getMenus, fullMenus, fullMenuKeys, isAuthPage };