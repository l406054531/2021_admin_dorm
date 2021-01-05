<template>
	<div class="left-nav console-lef-nav" :style="{ height: height }">
		<div class="logo-panel" @click="toMap('/')"><el-image class="logo" :src="logo"></el-image></div>
		<el-menu default-active="0" :default-openeds="defaultOpeneds" class="el-menu-vertical-demo" :collapse="isCollapse">
			<div v-for="(item, bigIndex) in leftNavData" :key="bigIndex.toString()">
				<el-submenu :index="bigIndex.toString()" v-if="item.child && item.child.length > 0">
					<template slot="title">
						<i v-if="item.icon" :class="item.icon"></i>
						<span slot="title" v-text="item.title"></span>
					</template>
					<el-menu-item
						v-for="(smallItem, smallIndex) in item.child"
						:key="smallIndex"
						:index="bigIndex.toString() + '-' + smallIndex.toString()"
						style="padding-left: 20px;"
						@click="doAction(smallItem)"
					>
						<i v-if="smallItem.icon" :class="smallItem.icon"></i>
						<span slot="title" v-text="smallItem.title"></span>
					</el-menu-item>
				</el-submenu>

				<el-menu-item :index="bigIndex.toString()" v-else @click="doAction(item)">
					<i v-if="item.icon" :class="item.icon"></i>
					<span slot="title" v-text="item.title"></span>
				</el-menu-item>
			</div>
		</el-menu>
	</div>
</template>

<script>
let _self;
import logo_black from '@/assets/images/logo_black.png';
import permission from '@/providers/permission.js';
export default {
	props: {
		width: {
			type: String,
			default: 'auto',
			required: true
		},
		height: {
			type: String,
			default: 'auto',
			required: true
		},
		value: {
			type: Number
		}
	},
	data() {
		return {
			logo: logo_black,
			isCollapse: false,
			// width: 'auto',
			// height: 'auto',
			leftNavData: [],
			defaultOpeneds: [],
			nowW: 200
		};
	},
	created() {
		_self = this;
		this.leftNavData = permission.getLeftConsoleNav();
		this.leftNavData.push({
			title: '登出系统',
			icon: 'fa fa-arrow-circle-left',
			callback: function(e) {
				e.userLagout();
			}
		});
		_self.initDefaultOpeneds();
		// this.initRoute();
	},
	watch: {
		isCollapse(newValue) {
			if (newValue) {
				this.value == 40;
			} else {
				this.value == 200;
			}
		}
	},
	methods: {
		initRoute(){
			for(let item of this.leftNavData){
				if(item.view != ''){
					if(this.$route.path != item.view){
						this.toMap(item.view);
					}
					return;
				}
				if(item.child){
					for(let child of item){
						if(child.view != ''){
							if(this.$route.path != child.view){
								this.toMap(child.view);
							}
							return;
						}
					}
				}
			}
		},
		checkSize: function() {
			let w = document.documentElement.clientWidth,
				h = document.documentElement.clientHeight;
			_self.width = w + 'px';
			_self.height = h + 'px';
		},
		initDefaultOpeneds: function() {
			for (let i in _self.leftNavData) {
				if (_self.leftNavData[i].show) {
					_self.defaultOpeneds.push(i);
				}
			}
		},
		doAction: function(item) {
			if (item.view) {
				_self.toMap(item.view);
				return;
			}
			if (typeof item.callback == 'function') {
				item.callback(_self);
			}
		}
	}
};
</script>
<style scoped>
.left-nav {
	width: 200px;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
}
.left-nav .logo-panel {
	width: 200px;
	height: 50px;
	line-height: 50px;
	background-color: #ffffff;
	border-bottom: 1px dotted #eee;
	cursor: pointer;
}
.left-nav .logo {
	width: 150px;
	margin-top: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
	height: 100%;
}
.el-menu-vertical-demo.el-menu--collapse > div {
	overflow: hidden;
}
.el-menu-vertical-demo.el-menu--collapse [slot='title'] {
	display: none;
}

.el-submenu__title,
.el-menu-item {
	text-align: left;
	padding-left: 20px;
}
</style>
