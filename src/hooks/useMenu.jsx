import { useState } from "react";


const useMenu = () => {
    const [menu,setMenu]= useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        fetch('menu.json')
        .then(res=> res.json())
        .then(datas=>{
            setMenu(datas);
            setLoading(false)

        })
    },[])

    return [menu,loading]
};

export default useMenu;