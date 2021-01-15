const getters = {
    permission_routes: state => state.permission.addRoutes,
    userInfo: state => state.user.userInfo,
    role: state => state.user.role,
    routers: state => JSON.parse(state.user.routers),
    radio: state => state.radio.radio,
    permission_routes: state => state.permission.routes,
}

export default getters