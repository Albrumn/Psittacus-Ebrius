import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.body).render(
        <BrowserRouter basename="/psittacusebrius">
                <App />
        </BrowserRouter>
);
