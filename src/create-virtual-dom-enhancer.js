export default ({
  customFilter,
  enhance,
  filesToLoad = {},
  name
}) => (props) => {
  if (!props) { return {} }

  const Hook = function Hook () {}
  const nodeInitIndicatorClass = 'gc-enhanced-node'

  Hook.prototype.hook = async (node) => {
    if (typeof customFilter === 'function' && !customFilter({ node, props })) { return }
    if (typeof customFilter !== 'function' && (!node.isConnected || node.classList.contains(nodeInitIndicatorClass))) {
      return
    }

    const fileIds = Object.keys(filesToLoad)

    node.classList.add(nodeInitIndicatorClass)

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const fileId of fileIds) {
        const fileUri = filesToLoad[fileId]
        const scriptLoadIndicatorId = `gc-external-script-${fileId}`

        // eslint-disable-next-line no-await-in-loop
        await (async () => new Promise((resolve, reject) => {
          if (global.document.getElementById(scriptLoadIndicatorId)) {
            resolve()
            return
          }

          let tagToAppend

          if (/\.css$/.test(fileUri)) {
            tagToAppend = global.document.createElement('style')
            tagToAppend.type = 'text/css'
            tagToAppend.rel = 'stylesheet'
            tagToAppend.href = fileUri
          } else {
            tagToAppend = global.document.createElement('script')
            tagToAppend.src = fileUri
          }

          tagToAppend.id = scriptLoadIndicatorId
          tagToAppend.onload = () => resolve()
          tagToAppend.onerror = () => reject(new Error(`Could not load: ${fileUri}`))
          global.document.head.appendChild(tagToAppend)
        }))()
      }
    } catch (err) {
      node.classList.remove(nodeInitIndicatorClass)
      // eslint-disable-next-line no-console
      console.error(err)
      return
    }

    enhance({ node, props })
  }

  return { [name]: new Hook() }
}
