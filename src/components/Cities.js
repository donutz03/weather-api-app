import { useState } from "react"

function Cities() {
  const [cities, setCities] = useState(['London', 'Paris', 'New York', 'Tokyo', 'Dubai', 'Barcelona', 'Rome', 
'Madrid', 'Singapore', 'Amsterdam'
])

  return(
    <div>
      <ul>
        {cities.map(city => <li>{city}</li>)}
      </ul>
    </div>
  )
}

export default Cities