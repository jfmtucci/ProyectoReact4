import { useEffect, useState } from "react";
import "../../App.css";

const Pizza = () => {
  const [pizza, setPizza] = useState(null);
  const [err, setErr] = useState(null);

  function formatNumber(number) {
    const formattedNumber = number.toLocaleString("en-US");
    return formattedNumber.replace(/,/g, ".");
  }

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas/p001");
        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setErr(err);
      }
    };
    fetchPizza();
  }, []);

  if (err) {
    return <div>Error: {err}</div>;
  }

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="row flex-row flex-wrap mt-4 justify-content-center">
        <article className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mt-3 mx-1 ms-5 mb-4">
          <div className="card mx-2">
            <img
              src={pizza.img}
              className="card-img-top producto"
              alt={`Pizza ${pizza.name}`}
            />
            <div className="">
              <h5 className="card-title fw-light mb-1 fw-bold">
                Pizza {pizza.name}
              </h5>
              <hr className="cardHr" />
              <div className="d-flex flex-row align-items-center justify-content-center">
                <img
                  src="/src/assets/img/pizza3.png"
                  className="icon2"
                  alt="pizza"
                />

                <ul>
                  {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <hr className="cardHr" />
              <span className="h5 fw-bold green mt-5 ms-3">
                Precio: ${formatNumber(pizza.price)}
              </span>
              <div className="d-flex justify-content-around">
                <button
                  type="button"
                  style={{
                    border: "1px solid black",
                    padding: "0.5rem",
                    fontSize: "0.5rem",
                  }}
                >
                  Ver Más{"    "}
                  <img
                    src="/src/assets/img/eyes.png"
                    className="icon"
                    alt="ojos"
                  />
                </button>
                <button
                  type="button"
                  style={{
                    border: "1px solid black",
                    padding: "0.5rem",
                    fontSize: "0.5rem",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  Añadir{"    "}
                  <img
                    src="../img/carro-compras-realista.png"
                    className="icon"
                    alt="carro"
                  />
                </button>
              </div>
            </div>
          </div>
        </article>
        <p>{pizza.desc}</p>
      </div>
    </div>
  );
};

export default Pizza;
