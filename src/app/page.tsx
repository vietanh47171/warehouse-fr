import Content from './components/Content';
import Menu from './components/Menu';
import './globals.css';
import { MyProvider } from './store/myContext';
import { ProductDataProvider } from './store/myProduct';
import { SortByProvider } from './store/mySortBy';

export default function Home() {
    return (
        <div>
            <MyProvider>
                <SortByProvider>
                    <Menu />
                    <ProductDataProvider>
                        <Content />
                    </ProductDataProvider>
                </SortByProvider>
            </MyProvider>
        </div>
    );
}
