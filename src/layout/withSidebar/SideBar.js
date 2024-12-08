
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { ApiAdmin } from 'api/ApiAdmin';



export default function SideBar() {
  const [firstCat, setFirstCat] = useState({});
  const [secondCat, setSecondCat] = useState({});
//   const [thirdCat, setThirdCat] = useState({});
  const [subCat, setSubCat] = useState({});

  useEffect(() => {
    (async () => {
      let firstResponse = await ApiAdmin.products('categories/1');
      setFirstCat(firstResponse.data);

      let secondResponse = await ApiAdmin.products('categories/2');
      setSecondCat(secondResponse.data);

    //   let thirdResponse = await ApiAdmin.products('categories/3');
    //   setThirdCat(thirdResponse.data);
    let subResponse = await ApiAdmin.products('subCategories');
    setSubCat(subResponse.data);
    })()
  }, []);

console.log(subCat,"subbbbb")
  return (
    <Grid className="sidebar">
   
      <Grid pt={2} >
        <Link to={`/allProduct/category${secondCat.id}`} className="side-link-top">
          {'دسته‌بندی ' + secondCat.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${secondCat.id}/subcategory${subCat[4]?.id}`} className="side-link">
        {subCat[4]?.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${secondCat.id}/subcategory${subCat[5]?.id}`} className="side-link">
        {subCat[5]?.name}
        </Link>
      </Grid>
      <Grid pt={5}>
        <Link to={`/allProduct/category${firstCat.id}`} className="side-link-top">
          {'دسته‌بندی ' + firstCat.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${firstCat.id}/subcategory${subCat[0]?.id}`} className="side-link">
        {subCat[0]?.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${firstCat.id}/subcategory${subCat[1]?.id}`} className="side-link">
        {subCat[1]?.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${firstCat.id}/subcategory${subCat[2]?.id}`} className="side-link">
        {subCat[2]?.name}
        </Link>
      </Grid>
      <Grid>
        <Link to={`/allProduct/category${firstCat.id}/subcategory${subCat[3]?.id}`} className="side-link">
        {subCat[3]?.name}
        </Link>
      </Grid>
    </Grid>
  )
};