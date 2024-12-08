import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { ApiAdmin } from "api/ApiAdmin";

const categories = ["موبایل", "لپ تاپ"];

const ModalForm = ({ inEditMode, handleClose, getPosts }) => {
  const initialValues = {
    name: "",
    sub_category_id: "",
    category:"",
    model: "",
    category_id: "",
    description: "",
    price: "",
    inventory: "",
    images: [],
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [editData, setEditData] = useState(undefined);
  const [formValEdit, setFormValEdit] = useState("");

  const imgRef = useRef();
  const preview = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      if (imgRef && imgRef.current) imgRef.current.src = e.target?.result;
    };
    fileReader.readAsDataURL(file);
  };
  let id = inEditMode.rowKey;

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${id}`).then((res) =>
      setTimeout(() => {
        setEditData({
          name: res.data.name,
          category: res.data.category,
          sub_category_id: res.data.sub_category_id,
          model: res.data.model,
          category_id: res.data.category_id,
          images: res.data.images,
          price: res.data.price,
          inventory: res.data.inventory,
          description: res.data.description,
          id: res.data.id,
        });
      }, 1000)
    );
  }, []);

  // onchange images
  const handlergallary = async (e) => {
    let files = Array.from(e.target.files);
    preview(files[0]);
    let temp = [];
    files.map((item) => {
      const formData = new FormData();
      formData.append("image", item);
      let tempRequest = ApiAdmin.upload(formData);
      temp.push(tempRequest);
    });

    const arrayResponse = await Promise.all(temp);
    setFormValues({
      ...formValues,
      images: arrayResponse.map((i) => `/files/${i.data.filename}`),
    });
  };

  //onchange add product//
  const addHandelChange = (e) => {
    
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  //onchange Edite//
  const handleChange = (e) => {
    console.log("hello")
    setFormValEdit({ ...formValEdit, [e.target.name]: e.target.value });
  };

  //  onchnage CKEditor
  const CkeditorHandler = (event, editor) => {
    console.log(editor.getData());
    const data = editor.getData().replaceAll(/[<span></span>]/g, "");
    console.log({ event, editor, data });
    setFormValEdit({ description: data });
  };

  const CkeditorHandlerAdd = (event, editor) => {
    const data = editor.getData().replaceAll(/[<span></span>]/g, "");
    console.log({ event, editor, data });
    setFormValues({ ...formValues, description: data });
  };

  let token = localStorage.getItem("token");
  
  const submitEdit = async (e) => {
   console.log("byyyyy")
    e.preventDefault();
    await axios.patch(`http://localhost:3002/products/${editData.id}`, formValEdit, {
      headers: {
        token: token,
      },
    });
    // axios.get(`http://localhost:3002/products/${editData.id}`, value);
 
    // handleClose();
    getPosts();
  };

  const submitAdd = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3002/products`, formValues);

    // axios.get(`http://localhost:3002/products/${editData.id}`, formValues);
    handleClose();
    getPosts();
  };
  return (
    <>
      {editData ? (
        <form onClick={submitEdit} className="containerform">
          <label htmlFor="images">تصویر کالا </label>
          <div className="inputImage">
            <img
              alt={editData.name}
              src={editData?.images[0]}
              ref={imgRef}
              height={88}
            />
            <div>
              <input
                multiple
                className="inputForm"
                name="images"
                type="file"
                onChange={(e) => handlergallary(e)}
              />
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="model">نام کالا</label>
              <input
                defaultValue={editData.model}
                className="inputForm"
                type="text"
                name="model"
                id="model"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="price">قیمت</label>
              <input
                defaultValue={editData.price}
                className="inputForm"
                type="text"
                name="price"
                id="price"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="count">تعداد</label>
              <input
                defaultValue={editData.inventory}
                className="inputForm"
                type="number"
                name="inventory"
                id="inventory"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="category">دسته بندی</label>
              <select
                id="category"
                name="category"
                defaultValue={editData.category}
                onChange={(e) => handleChange(e)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="category_id">شماره دسته‌بندی</label>
              <input
                className="inputForm"
                type="number"
                min="1"
                max="3"
                name="category_id"
                id="category_id"
                defaultValue={editData.category_id}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="sub_category_id">شماره زیر‌دسته</label>
              <input
                className="inputForm"
                type="number"
                min="1"
                max="15"
                name="sub_category_id"
                id="sub_category_id"
                defaultValue={editData.sub_category_id}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="description ">توضیحات</label>
            <CKEditor
              editor={ClassicEditor}
              data={editData.description}
              className="inputForm"
              name="description"
              id="description"
              onChange={CkeditorHandler}
            />
          </div>
          <button type="submit">ذخیره</button>
        </form>
      ) : (
        <form onSubmit={submitAdd} className="containerform">
          <div className="form-row">
            <div className="inputImage">
              <label htmlFor="images">تصویر کالا </label>
              <img alt={formValues.model} src="" ref={imgRef} height={88} />
              <div>
                <input
                  multiple
                  className="inputForm"
                  id="images"
                  name="images"
                  type="file"
                  onChange={(e) => handlergallary(e)}
                />
              </div>
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="model">نام کالا</label>
              <input
                className="inputForm"
                type="text"
                name="model"
                id="model"
                value={formValues.model}
                onChange={(e) => addHandelChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="price">قیمت</label>
              <input
                className="inputForm"
                type="text"
                name="price"
                id="price"
                value={formValues.price}
                onChange={(e) => addHandelChange(e)}
              />
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="inventory">تعداد</label>
              <input
                className="inputForm"
                type="number"
                name="inventory"
                id="inventory"
                value={formValues.inventory}
                onChange={(e) => addHandelChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="category">دسته بندی</label>
              <select
                id="category"
                name="category"
                value={formValues.category}
                onChange={(e) => addHandelChange(e)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-main">
            <div className="form-row">
              <label htmlFor="category_id">شماره دسته‌بندی</label>
              <input
                className="inputForm"
                type="number"
                min="1"
                max="3"
                name="category_id"
                id="category_id"
                value={formValues.category_id}
                onChange={(e) => addHandelChange(e)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="sub_category_id">شماره زیر‌دسته</label>
              <input
                className="inputForm"
                type="number"
                min="1"
                max="15"
                name="sub_category_id"
                id="sub_category_id"
                value={formValues.sub_category_id}
                onChange={(e) => addHandelChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="description ">توضیحات</label>
            <CKEditor
              editor={ClassicEditor}
              className="inputForm"
              name="description"
              id="description"
              onChange={CkeditorHandlerAdd}
            />
          </div>
          <button type="submit">ذخیره</button>
        </form>
      )}
    </>
  );
};

export default ModalForm;
