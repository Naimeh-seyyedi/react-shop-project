import HttpAdmin from "./HttpAdmin" ;

const ApiAdmin=new HttpAdmin("/")

ApiAdmin.login=function(body){
    return this.instance.post(`${this.baseURL}auth/login`,body)
}
ApiAdmin.addproduct=function(body) {
    return this.instance.post(`${this.baseURL}products`,body)
}

ApiAdmin.alldata=function(url) {
    return this.instance.get(`${this.baseURL}products${url}`)
}

ApiAdmin.delete=function(id) {
    return this.instance.delete(`${this.baseURL}products/${id}`)
}

ApiAdmin.products=function(url) {
    return this.instance.get(`${this.baseURL}${url}`)
}
ApiAdmin.subcategory=function(url) {
    return this.instance.get(`${this.baseURL}subcategory${url}`)
}
ApiAdmin.upload=function(formData) {
    return this.instance.post(`${this.baseURL}upload`,formData)
}
ApiAdmin.put=function(id,selectedProduct) {
    return this.instance.put(`${this.baseURL}products/${id}`,selectedProduct)
}
ApiAdmin.patch=function(id,selectedProduct) {
    return this.instance.patch(`${this.baseURL}products/${id}`,selectedProduct)
}
ApiAdmin.unitProduct=function(id) {
    return this.instance.get(`${this.baseURL}products/${id}`)
}
ApiAdmin.product=function(params) {
    return this.instance.get(`${this.baseURL}products${params}`)
}
ApiAdmin.orders=function(url,t) {
    return this.instance.get(`${this.baseURL}${url}`,t)
}
ApiAdmin.postOrder=function(url,info) {
    return this.instance.post(`${this.baseURL}${url}`,info)
}
export {ApiAdmin}