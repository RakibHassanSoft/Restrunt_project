import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
//  image 
import menuImage from '../../../assets/menu/banner3.jpg'
import desertBG from '../../../assets/menu/dessert-bg.jpeg'
import pizzzabg from '../../../assets/menu/pizza-bg.jpg'
import saladbg from '../../../assets/menu/salad-bg.jpg'
import soupbg from '../../../assets/menu/soup-bg.jpg'


import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
  const [menu, setMenu] = useState([])
  const desserts = menu.filter(item => item.category === 'dessert')
  const soup = menu.filter(item => item.category === 'soup')
  const salad = menu.filter(item => item.category === 'salad')
  const pizza = menu.filter(item => item.category === 'pizza')
  const offered = menu.filter(item => item.category === 'offered')
  useEffect(() => {
    fetch('http://localhost:5000/menu')
      .then(res => res.json())
      .then(datas => {
        setMenu(datas)
        // setMenu(datas)
      })
  }, [])
  return (
    <div>
      <Helmet>
        <title>Restunt | menu</title>
      </Helmet>

      {/* main cover  */}
      <Cover
        title={"Ouser menu"}
        img={menuImage}>
      </Cover>

      <SectionTitle
        subHeading={"Dont miss"}
        heading={"today's offer"}>
      </SectionTitle>

      {/* offered  menu items*/}
      <MenuCategory
        items={offered}
        coverImg={menuImage}>
      </MenuCategory>

      {/* desert item  */}
      <MenuCategory
        items={desserts}
        title={"dessert"}
        coverImg={desertBG}>
      </MenuCategory>

      {/* pizza item */}
      <MenuCategory
        items={pizza}
        title={"pizza"}
        coverImg={pizzzabg}>
      </MenuCategory>

      {/* salat item */}
      <MenuCategory
        items={salad}
        title={"salad"}
        coverImg={saladbg}>
      </MenuCategory>

      {/* soup item  */}
      <MenuCategory
        items={soup}
        title={"soup"}
        coverImg={soupbg}>
      </MenuCategory>

    </div>
  );
};

export default Menu;