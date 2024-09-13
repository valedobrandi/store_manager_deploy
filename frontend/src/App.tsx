/* eslint-disable react/jsx-max-depth */
import Window from './components/Window';
import useFetchProducts from './Hooks/useFetchData';
import Table from './components/Table';
import SearchBar from './components/BarSearch';
import useConditionalRendering from './Hooks/useConditionalRendering';
import RegisterBar from './components/BarRegister';
import BarDelete from './components/BarDelete';
import BarUpdate from './components/BarUpdate';
import useSendData from './Hooks/useSendData';
import Alerts from './components/Alerts';
import TransitionEvent from './components/Transition';
import ButtonJoinGroup from './components/ButtonJoinGroup';
import useCollapse from './Hooks/useCollapse';

function App() {
  const { typeRequest } = useConditionalRendering();
  const { sendHttp } = useSendData();
  const { fetchHttp, salesData, productsData } = useFetchProducts();
  const { onSetCollapse: onSetCollapseProduct, visible: visibleProduct } = useCollapse();
  const { onSetCollapse: onSetCollapseSale, visible: visibleSale } = useCollapse();

  return (
    <Window>
      <div className="flex flex-col m-1">
        <div className="">
          <TransitionEvent display={ typeRequest('search') } time={ 0 }>
            <Alerts
              isSuccess={ fetchHttp.isSuccess }
              isError={ fetchHttp.isError }
              error={ fetchHttp.error }
              message="SUCCESS"
            >
              <SearchBar
                usefetchLazyData={ fetchHttp.usefetchLazyData }
                searchData={ fetchHttp.fetchData }
              />
            </Alerts>
          </TransitionEvent>
          <TransitionEvent display={ typeRequest('register') } time={ 0 }>
            <Alerts
              isSuccess={ sendHttp.isSuccess }
              isError={ sendHttp.isError }
              error={ sendHttp.error }
              message={ sendHttp.sendData }
            >
              <RegisterBar usefetchLazyData={ sendHttp.useSendLazyData } />
            </Alerts>
          </TransitionEvent>
          <TransitionEvent display={ typeRequest('delete') } time={ 0 }>
            <Alerts
              isSuccess={ sendHttp.isSuccess }
              isError={ sendHttp.isError }
              error={ sendHttp.error }
              message="SUCCESS"
            >
              <BarDelete usefetchLazyData={ sendHttp.useSendLazyData } />
            </Alerts>
          </TransitionEvent>
          <TransitionEvent display={ typeRequest('update') } time={ 0 }>
            <Alerts
              isSuccess={ sendHttp.isSuccess }
              isError={ sendHttp.isError }
              error={ sendHttp.error }
              message={ sendHttp.sendData }
            >
              <BarUpdate usefetchLazyData={ sendHttp.useSendLazyData } />
            </Alerts>
          </TransitionEvent>
        </div>
      </div>
      <div className="flex">
        <Table data={ productsData } visible={ visibleProduct }>
          <ButtonJoinGroup title="HIDE" onHandleClick={ onSetCollapseProduct } />
          <ButtonJoinGroup title="REFRESH" onHandleClick={ fetchHttp.productsRefresh } />
        </Table>
        <Table data={ salesData } visible={ visibleSale } key="sales">
          <ButtonJoinGroup title="HIDE" onHandleClick={ onSetCollapseSale } />
          <ButtonJoinGroup title="REFRESH" onHandleClick={ fetchHttp.salesRefresh } />
          <h1
            className="text-5xl text-center uppercase
                       text-black font-semibold p-4"
          >
            Table Products
          </h1>
        </Table>
      </div>
    </Window>
  );
}

export default App;
