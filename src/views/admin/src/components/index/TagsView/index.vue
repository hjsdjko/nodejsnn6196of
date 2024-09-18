<template>
	<div id="tags-view-container" class="tags-view-container" :style='{"padding":"20px 0px","boxShadow":"none","margin":"0px auto 0","borderColor":"#344f60","display":"block","overflow":"hidden","borderRadius":"0px 0px 0 0","background":"none","borderWidth":"0 0 0px","width":"calc(100% - 60px)","fontSize":"14px","borderStyle":"solid","height":"auto"}'>
		<scroll-pane ref="scrollPane" class="tags-view-wrapper">
			<div class="tags-view-box" :style='{"width":"auto","whiteSpace":"nowrap","position":"relative","background":"none"}'>
				<router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="isActive(tag)?'active':''"
					:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item"
					@click.middle.native="closeSelectedTag(tag)" @contextmenu.prevent.native="openMenu(tag,$event)">
					<span class="text">{{ tag.name }}</span>
					<span v-if="!tag.meta.affix" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
				</router-link>
			</div>
		</scroll-pane>
		<ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
			<li v-if="!(selectedTag.meta&&selectedTag.meta.affix)" @click="closeSelectedTag(selectedTag)">Close</li>
			<li @click="closeAllTags(selectedTag)">Close All</li>
		</ul>
	</div>
</template>

<script>
	import ScrollPane from './ScrollPane'
	import path from 'path'
	import {
		generateTitle
	} from '@/utils/i18n'
	import menu from '@/utils/menu'
	import { routes } from '@/router/router-static.js'
	
	export default {
		components: {
			ScrollPane
		},
		data() {
			return {
				visible: false,
				top: 0,
				left: 0,
				selectedTag: {},
				affixTags: [],
				routes: []
			}
		},
		computed: {
			visitedViews() {
				return this.$store.state.tagsView.visitedViews
			},
			// routes() {
			//   return this.$store.state.menu.routes
			// }
		},
		watch: {
			$route() {
				this.addTags()
				this.moveToCurrentTag()
			},
			visible(value) {
				if (value) {
					document.body.addEventListener('click', this.closeMenu)
				} else {
					document.body.removeEventListener('click', this.closeMenu)
				}
			}
		},
		mounted() {
			this.initTags()
			this.addTags()
		},
		created() {
			this.routes = menu
			
			let menuList = []
			const menus = menu.list()
			if (menus) {
				menuList = menus
			} else {
				let params = {
					page: 1,
					limit: 1,
					sort: 'id',
				}
			
				this.$http({
					url: "menu/list",
					method: "get",
					params: params
				}).then(({
					data
				}) => {
					if (data && data.code === 0) {
						menuList = JSON.parse(data.data.list[0].menujson);
						this.$storage.set("menus", menuList);
					}
				})
			}
			this.role = this.$storage.get('role')
			
			for (let i = 0; i < menuList.length; i++) {
				if (menuList[i].roleName == this.role) {
					this.routes = menuList[i].backMenu;
					break;
				}
			}
			this.routes = routes.concat(this.routes);
			// console.log(this.visitedViews)
			// console.log(this.routes)
			// this.initTags()
			// this.addTags()
		},
		methods: {
			isActive(route) {
				return route.path === this.$route.path
			},
			filterAffixTags(routes, basePath = '/') {
				let tags = []
				routes.forEach(route => {
					if (route.meta && route.meta.affix) {
						const tagPath = path.resolve(basePath, route.path)
						tags.push({
							fullPath: tagPath,
							path: tagPath,
							name: route.name,
							meta: {
								...route.meta
							}
						})
					}
					if (route.children) {
						const tempTags = this.filterAffixTags(route.children, route.path)
						if (tempTags.length >= 1) {
							tags = [...tags, ...tempTags]
						}
					}
				})
				return tags
			},
			generateTitle,
			initTags() {
				const affixTags = this.affixTags = this.filterAffixTags(this.routes)
				for (const tag of affixTags) {
					// Must have tag name
					if (tag.name) {
						this.$store.dispatch('tagsView/addVisitedView', tag)
					}
				}
			},
			addTags() {
				const {
					name
				} = this.$route
				if (name) {
					this.$store.dispatch('tagsView/addView', this.$route)
				}
				return false
			},
			moveToCurrentTag() {
				const tags = this.$refs.tag
				this.$nextTick(() => {
					for (const tag of tags) {
						if (tag.to.path === this.$route.path) {
							this.$refs.scrollPane.moveToTarget(tag)
							// when query is different then update
							if (tag.to.fullPath !== this.$route.fullPath) {
								this.$store.dispatch('tagsView/updateVisitedView', this.$route)
							}
							break
						}
					}
				})
			},
			refreshSelectedTag(view) {
				this.$store.dispatch('tagsView/delCachedView', view).then(() => {
					const {
						fullPath
					} = view
					this.$nextTick(() => {
						this.$router.replace({
							path: '/redirect' + fullPath
						})
					})
				})
			},
			closeSelectedTag(view) {
				this.$store.dispatch('tagsView/delView', view).then(({
					visitedViews
				}) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view)
					}
				})
			},
			closeOthersTags() {
				this.$router.push(this.selectedTag)
				this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
					this.moveToCurrentTag()
				})
			},
			closeAllTags(view) {
				this.$store.dispatch('tagsView/delAllViews').then(({
					visitedViews
				}) => {
					if (this.affixTags.some(tag => tag.path === view.path)) {
						return
					}
					this.toLastView(visitedViews, view)
				})
			},
			toLastView(visitedViews, view) {
				const latestView = visitedViews.slice(-1)[0]
				if (latestView) {
					this.$router.push(latestView)
				} else {
					// now the default is to redirect to the home page if there is no tags-view,
					// you can adjust it according to your needs.
					if (view.name === 'Dashboard') {
						// to reload home page
						this.$router.replace({
							path: '/redirect' + view.fullPath
						})
					} else {
						this.$router.push('/')
					}
				}
			},
			openMenu(tag, e) {
				const menuMinWidth = 105
				const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
				const offsetWidth = this.$el.offsetWidth // container width
				const maxLeft = offsetWidth - menuMinWidth // left boundary
				const left = e.clientX - offsetLeft + 15 // 15: margin right

				if (left > maxLeft) {
					this.left = maxLeft
				} else {
					this.left = left
				}

				this.top = e.clientY
				this.visible = true
				this.selectedTag = tag
			},
			closeMenu() {
				this.visible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tags-view-container {
		height: 34px;
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #d8dce5;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

		.contextmenu {
			margin: 0;
			background: #fff;
			z-index: 3000;
			position: absolute;
			list-style-type: none;
			padding: 5px 0;
			border-radius: 4px;
			font-size: 12px;
			font-weight: 400;
			color: #333;
			box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);

			li {
				margin: 0;
				padding: 7px 16px;
				cursor: pointer;

				&:hover {
					background: #eee;
				}
			}
		}
	}
	
	.tags-view-container .tags-view-wrapper .tags-view-item {
				cursor: pointer;
				padding: 0px 46px 0px 8px;
				margin: 0 10px 0px 0;
				color: #000;
				display: inline-block;
				font-size: inherit;
				border-color: #f1f9ff;
				line-height: 30px;
				border-radius: 4px;
				background: url(http://codegen.caihongy.cn/20231108/25980ca35fa8422d88c461fa57d4da1a.png) no-repeat 80% center / 20px,#fff;
				width: auto;
				border-width: 0px 0px 0 0px;
				position: relative;
				border-style: solid;
				height: 30px;
			}
	
	.tags-view-container .tags-view-wrapper .tags-view-item:hover {
				color: #fff;
				background: url(http://codegen.caihongy.cn/20231108/3f118efc700f4bfba8070aac40034de8.png) no-repeat 80% center / 20px,#ffc054;
				border-color: #bff5ff;
				border-width: 0px 0px 0 0px;
				border-style: solid;
			}
	
	.tags-view-container .tags-view-wrapper .tags-view-item.active {
				color: #fff;
				background: url(http://codegen.caihongy.cn/20231108/3f118efc700f4bfba8070aac40034de8.png) no-repeat 80% center / 20px,#ffc054;
				border-color: #bff5ff;
				border-width: 0px 0px 0 0px;
				border-style: solid;
			}
	
	.tags-view-container .tags-view-wrapper .tags-view-item .text {
				color: inherit;
				font-size: inherit;
			}
	
	.tags-view-container .tags-view-wrapper .tags-view-item .el-icon-close {
				color: inherit;
				top: 1px;
				font-size: 12px;
				position: absolute;
				right: 1px;
			}
</style>