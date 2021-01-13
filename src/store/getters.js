const getters = {
    permission_routes: state => state.permission.addRoutes,
    userInfo: state => state.user.userInfo,
    role: state => state.user.role,
    radio: state => state.radio.radio,
}

export default getters