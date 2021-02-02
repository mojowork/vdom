// 返回一个 Virtual DOM对象
export function h (tag, props, children) {
    return Object.assign({
        tag,
        props,
        key: props.key,
        ele: undefined
    }, Array.isArray(children) ? { children } : { text : children} )
}
// 实现挂载或者最小化更新
export function patch (oldVnode, newVnode) {
    // console.log(oldVnode, newVnode)
    // 判断 oldVnode 真实DOM
    if(!isVnode(oldVnode)){
        // 实现挂载
        let newNode = createElement(newVnode)
        oldVnode.appendChild(newNode)
    } else if(sameVnode(oldVnode, newVnode)) {
        // 最小化更新
        patchVnode(oldVnode, newVnode)
    } else if(oldVnode.ele){
        let newNode = createElement(newVnode)
        let parent = oldVnode.ele.parentNode
        parent.appendChild(newNode)
        parent.removeChild(oldVnode.ele)
    }
}

//根据 Virtual DOM 创建真实的DOM
function createElement(vnode) {
    const {tag, props, children, text} = vnode
    let element = document.createElement(tag)
    // Object.keys(props).reduce((ele, key) => {
    //     let value = props[key]
    //     let attr = document.createAttribute(key)
    //     attr.value = value
    //     ele.setAttributeNode(attr)
    // }, element)
    if(children && children.length){
        for(let i = 0, len = children.length; i < len; i++ ){
            const child = children[i]
           if(isVnode(child)){
                let eleNode = createElement(child)
                element.appendChild(eleNode)
            }
        }
    } else if(typeof text === 'string' || typeof text === 'number') {
        let textNode = document.createTextNode(text)
        element.appendChild(textNode)
    }
    
    vnode.ele = element
    return element
}

//两个vnode diff
export function patchVnode (oldVnode, newVnode) {
    newVnode.ele =  oldVnode.ele
    // TODO 属性更新
    if(oldVnode.text && newVnode.text){
        oldVnode.ele.innerText = newVnode.text
    } else if(oldVnode.children && oldVnode.children.length && newVnode.text){
        oldVnode.children = undefined
        oldVnode.ele.innerText = newVnode.text
    } else if(oldVnode.text && newVnode.children && newVnode.children.length) {
        oldVnode.text = undefined
        oldVnode.ele.innerText = ''
        console.log('children', newVnode.children)
        for(let i = 0, len = newVnode.children.length; i < len; i++){
            let child = newVnode.children[i]
            console.log('child', child)
            let childNode = createElement(child)
            oldVnode.ele.appendChild(childNode)
        }
    } else if(oldVnode.children && oldVnode.children.length && newVnode.children && newVnode.children.length ) {
        // 最小化更新
        updateChildren(oldVnode.children, newVnode.children)
    }
}


    // 遍历 oldChildren 用对象缓存
    // 遍历 newChildren每项，命中patch，并删除对象中的整条数据
    // 没命中 oldChildren 新建此项(之前一次都没有命中过，新建的此项存在内存中，否则就 oldChildren 中 insertAfter)
    // 遍历完成 对象剩下的数据删除
function updateChildren(oldChildren, newChildren) {
    let cached = {}, parentNode = null, lastOldChild = null, createdQueue = []
    for(let i = 0, len = oldChildren.length; i < len; i++){
        let oldChild = oldChildren[i]
        cached[oldChild.key + oldChild.tag] = oldChild
        if(!parentNode){
            parentNode = oldChild.ele && oldChild.ele.parentNode
        }
    }

    for(let i = 0, len = newChildren.length; i < len; i++){
        let newChild = newChildren[i]
        if(cached[newChild.key + newChild.tag]){
            patchVnode(cached[newChild.key + newChild.tag], newChild)
            lastOldChild = cached[newChild.key + newChild.tag].ele
            delete cached[newChild.key + newChild.tag]
        } else {
            let newChildNode = createElement(newChild)
            if(lastOldChild){
                createdQueue.push(newChildNode)
                while(createdQueue.length){
                    let shiftChild = createdQueue.shift() 
                    insertAfter(shiftChild, lastOldChild)
                    lastOldChild = shiftChild
                }
            } else {
                createdQueue.push(newChildNode)
            }
        }
    }
    Object.values(cached).forEach(vnode => {
        vnode.ele.remove()
    })

    while(parentNode && createdQueue.length){
        if(parentNode.children){
            parentNode.insertBefore(createdQueue.pop(), parentNode.children[0])
        } else {
            parentNode.appendChild(createdQueue.shift())
        }        
    }
    
}

function insertAfter(newChild, existingChild) {
    if(existingChild.nextelementsibling){
        existingChild.parentNode.insertBefore(newChild, existingChild.nextelementsibling)
    } else {
        existingChild.parentNode.appendChild(newChild)
    }
}

/* =========== 工具方法 ============== */

const isVnode = node => node.tag;
const sameVnode = (vnode1, vnode2) => vnode1.tag === vnode2.tag && vnode1.key === vnode2.key