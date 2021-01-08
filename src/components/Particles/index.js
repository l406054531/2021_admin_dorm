import Particles from './src/main.vue';
Particles.install = (Vue)=>{
     Vue.component(Particles.name,Particles)
}
// 导出组件
export default Particles