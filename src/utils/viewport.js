export default {
    inserted(el, binding, vnode) {
      const value = binding.value
      const isObject = Object.prototype.toString.call(value) === '[object Object]'
      const func = isObject ? value.callback : value
      const isFunc = func && typeof func === 'function'
  
      const selector = isObject ? value.root : null
      const threshold = isObject ? value.threshold : 1
      const options = {
        root: selector ? document.querySelector(selector) : null, // 指定根(root)元素，未指定或 null 则默认为浏览器视窗
        threshold: threshold || 1, // 监听目标与边界盒交叉区域的比例值 0-1
      }
  
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 执行回调方法
            isFunc && func()
  
            // 停止监听
            observer.unobserve(el)
          }
        })
      }, options)
  
      // 开始监听元素
      observer.observe(el)
    },
  }