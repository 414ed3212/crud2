import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Main = () => {
  const [values, setValues] = useState([])
  const [inputs, setInputs] = useState([])
  useEffect(() => {
    getValues()
  }, [])
  const getValues = () => {
    axios.get('http://localhost/Crud/server/api/App/')
      .then((res) => {
        setValues(res.data)
      })
      .catch(err => {
        return err
      })
  }

  const deleteHandle = () => {
    let arrayids = []
    values.forEach((p) => {
      if (inputs === true) {
        arrayids.push(p.id)
      }
    })
    axios.delete(`http://localhost/Crud/server/api/App/index.php/${arrayids}`)
      .then((res) => {
        getValues()
      }
      )
      .catch(err => { return err })

  }


  return (
    <div>
      <h1 className='cont--list'>Procut list</h1>
      <div className='delete-btn'>
        <button id="delete-product-btn" onClick={() => deleteHandle()}>MASS DELETE</button>
      </div>
      {
        values.map((value) => {
          return (
            <div key={value.id} className="column">
              <div className='card'>
                <input type="checkbox" className='delete-checkbox'
                  onChange={(e) => {
                    let select = e.target.checked
                    setInputs(select)
                  }}

                ></input>
                <p>{value.sku}</p>
                <p>{value.name}</p>
                <p>{value.price + " $"}</p>
                <p>{value.size ^ value.weight || "Dimension:" + value.height + "x" + value.width + "x" + value.lenght}</p>
              </div>
            </div>
          )
        })

      }

    </div >







    // <table>
    //   <thead>
    //     <tr>
    //       <th>Sku</th>
    //       <th>name</th>
    //       <th>price</th>
    //       <th>size</th>
    //       <th>height</th>
    //       <th>width</th>
    //       <th>lenght</th>
    //       <th>weight</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {
    //       values.map((value) => {
    //         return (
    //           <tr key={value.id}>
    //             <td>{value.sku}</td>
    //             <td>{value.name}</td>
    //             <td>{value.price}</td>
    //             <td>{value.size}</td>
    //             <td>{value.height}</td>
    //             <td>{value.width}</td>
    //             <td>{value.lenght}</td>
    //             <td>{value.weight}</td>
    //             <td> <input type="checkbox"></input></td>

    //           </tr>
    //         )
    //       })

    //     }
    //   </tbody>
    // </table>

  )
}

export default Main
//rfce