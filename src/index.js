
import { h, patch } from './wisdom' // helper function for creating vnodes


var container = document.getElementById('container')

var vnode = h('ol', {}, [
    h('li', {key:'A'}, 'A'),
    h('li', {key:'B'}, [
        h('h3', {}, 'haha'),
        h('h3', {}, 'haha2'),
        h('h3', {}, 'haha3'),
        h('h3', {}, 'haha4')
    ]),
    h('li', {key:'C'}, 'C'),
    h('li', {key:'D'}, 'D'),
    h('li', {key:'E'}, 'E'),
    h('li', {key:'F'}, 'F'),
])
// Patch into empty DOM element
patch(container, vnode)

var newVnode = h('div',{} ,'测试')
// // 1 `patch` invocation
patch(vnode, newVnode) 
var newVnode2 = h('div',{} ,'测试ceshi')
// // 2 `patch` invocation
patch(newVnode, newVnode2) 
var newVnode3 = h('div',{} ,[
    h('li', {key:'E'}, 'E'),
    h('li', {key:'F'}, 'F'),
])
// // 3 `patch` invocation
patch(newVnode2, newVnode3) 

var newVnode4 = h('div',{} ,[
    h('li', {key:'E'}, 'E'),
    h('li', {key:'A'}, 'A'),
])
// // 4 `patch` invocation
patch(newVnode3, newVnode4) 

var newVnode5 = h('div',{} ,[
    // h('li', {key:'E'}, 'E'),
    h('li', {key:'G'}, 'G'),
    h('li', {key:'F'}, 'F'),
    h('li', {key:'J'}, 'J'),
    h('li', {key:'w'}, 'W'),
    h('li', {key:'B'}, 'B'),
])
// // 5 `patch` invocation
patch(newVnode4, newVnode5)

var newVnode6 = h('div',{} ,[
    h('li', {key:'E'}, 'E'),
    h('li', {key:'G'}, 'G'),
    h('li', {key:'F'}, 'F'),
    h('li', {key:'J'}, 'J'),
    h('li', {key:'w'}, 'W'),
    h('li', {key:'B'}, 'B'),
])
// // 6 `patch` invocation
patch(newVnode5, newVnode6)

var newVnode7 = h('div',{} ,'123')
// // 5 `patch` invocation
patch(newVnode6, newVnode7)