import React from 'react'

const Status = () => {
  return (

    <div style={{ display: "flex" }}>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      CONFORMED{" "}
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      {" "}
      CANCELLED
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}>
      STARTED
    </Card>
    <Card style={{ marginLeft: "100px", width: "150px" }}></Card>
  </div>

  )
}

export default Status
