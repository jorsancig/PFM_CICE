import React,{ Component } from 'react';
import axios from 'axios';
import List from '../components/List';
import AppNav from '../components/AppNav';



class ListContainer extends Component {


    state ={
      gameData: [],
      currentOffset: 0,
      pageCounter: 1,
    }
    // history = useHistory()
    componentDidMount() {
      this.fetchData();
    }


    componentDidUpdate(prevProps,prevState) {
      const { currentOffset } = this.state;
      if (currentOffset !== prevState.currentOffset) {
        if (currentOffset < 0 ) {
          this.setState({
            currentOffset: 0,
            pageCounter: 1,
          });
          this.fetchData(prevState.currentOffset);
        }
        this.fetchData(currentOffset);
      }
    }
    

    fetchData = (offset = 0) => { 

      console.log( 'localStorage', localStorage )
      const { match } = this.props;
      const searchGame = match.params.searchGame;
      const url = `http://localhost:8000/api/external/steam/search/${searchGame}`
      
      axios.get(url )
      .then(res => {
        const { data } = res.data;

        this.setState({
          gameData: data,
        })

        console.log( 'gotten' )

      })
      .catch(error =>{
        console.log(error);
      })
    }

    increment= () => {
      const { currentOffset, pageCounter } = this.state;
      this.setState({
        currentOffset: currentOffset + 20,
        pageCounter: pageCounter + 1,
      });
    }

    decrement= () => {
      const { currentOffset, pageCounter } = this.state;
      this.setState({
        currentOffset: currentOffset - 20,
        pageCounter: pageCounter - 1,
      });
    }


    
    

    render( hola ) {
      
      this.fetchData();

      const { gameData } = this.state;

      return(
        <>
          <AppNav />
          <List gameData={gameData} />
        </>
      );
    }
  }

export default ListContainer;