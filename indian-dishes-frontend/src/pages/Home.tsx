import React, { useEffect, useState } from "react";
import DishesList from "../components/DishesList";
import axios from "axios";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [dishes, setDishes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/dishes");
        setDishes(response.data.data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div>
      <Header dishes={dishes} />
      <DishesList dishes={dishes} />
      <p>
        Not sure which dish to make?{" "}
        <span style={{ fontWeight: "600" }}>
          Try out our <Link to="/suggester">Dish Suggester</Link> feature
        </span>
      </p>
    </div>
  );
};

export default Home;
