import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 假设你的服务端 API 地址是 http://localhost:3000/api/data
      const response = await axios.get("http://www.hase-mlas.com/users?username=1");

      // 设置获取到的数据
      setData(response.data);
    } catch (err) {
      // 如果请求失败，设置错误信息
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Data Fetching Example</h1>
        <button onClick={fetchData}>Fetch Data</button>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && (
          <div>
            <h2>Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
