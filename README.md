# wisdom
## 最小可用的虚拟dom库
******
### DOM相关知识点整理
##### 节点关系图
![nodes](./assets/nodes.jpg)

##### 节点类型
|  节点类型   | nodeType | nodeName |
|---|---|---|
| 元素节点  |1| 'DIV'只读 |
| 属性节点  |2||
| 文本节点  |3|'#text'|
| 注释节点 |8|'#comment'|
| document |9|'#docment'|
| DocumentFragment | 11|
##### 查找节点
``` javascript
	// 存在 HTMLDocument
	// 性能较差，兼容性较好，不是动态存值 
	document.querySelector('css-selector') // Element
	document.querySelectorAll('css-selector') // NodeList 
	// get... 家族 
	document.getElementById('id') // 原型 Element 不存在此方法
	document.getElementsByTagName('div')// HTMLCollection
	document.getElementsByClassName('classname') // HTMLCollection
	element.hasChildNodes // 是否存在子节点
```

##### 创建节点
``` javascript
	document.createAttribute("class")	// 创建一个属性节点
	document.createComment('comments')	// 方法可创建注释节点。
	document.createDocumentFragment()	// 创建空的 DocumentFragment 对象，并返回此对象。
	document.createElement('p')	// 创建元素节点。
	document.createTextNode("Hello World")	// 创建文本节点
```

##### 更改节点
``` javascript
	element.appendChild(newChild) // 为元素添加一个新的子元素(不是新元素则剪切)
	element.replaceChild(newnode,oldnode)	// 替换一个子元素
	element.removeChild(removeChild)// 删除一个子元素(返回removeChild节点,在内存中)
	removeChild.remove() // 删除一个元素本身，不会存于内存，h5版本新方法
	element.insertBefore(newChild,existingChild)	// 现有的子元素之前插入一个新的子元素
	element.removeAttribute('style')	// 从元素中删除指定的属性
	element.innerHTML	// 设置或者返回元素的内容。
```

##### Virtual DOM概念
``` javascript
	// Virtual DOM 是JS对象，并且最少包含 tag、props 和 children, text而选一， 三个属性，用来描述真实的DOM
	{
		"tag": "ol",
		"props":{},
		"children": [
			{
				"tag": "li",
				"props":
				{
					"id": "li1",
				},
				"text": "hello world"
			}
		]
	}
```
##### Children diff 算法
``` javascript
	// 遍历 oldChildren 用对象缓存
	// 遍历 newChildren每项，命中patch，并删除对象中的整条数据
	// 没命中 oldChildren 新建此项(之前一次都没有命中过，新建的此项存在内存中，否则就 oldChildren 中 insertAfter)
	// 遍历完成 对象剩下的数据删除
```