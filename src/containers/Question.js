import React , {Component} from 'react';
import styled from 'styled-components';
import Card from '../components/Card/Card';


const QuestionWrapper = styled.div`
display : flex;
justify-content : space-between;
flex-direction : column;
margin : 5%;
`;

const Alert = styled.div`
text-align : center;
`;

const ROOT_API = 'https://api.satckexchange.com/2.2/';

class Question extends Component
{
    constructor(props)
    {
       super(props);
       this.state = {
           data : [],
           loading : false,
           error : '',
       };
    }



    async componentDidMount()
    {
        const { match } = this.props;
        try{
            const data = await fetch(
                `${ROOT_API}questions/${match.params.id}?site=stackoverflow`
            );

            const dataJson = await data.json();

            if(dataJson)
            {
                this.setState({
                    data : dataJson,
                    loading : false,
                });
            }
           
        }
        catch(error)
        {
        this.setState({
             loading : true,
             error : error.message,
         });
        }
    }



    render()
    {
        const {data , loading , error} = this.state;
        if(loading || error)
        {
            return(
                <Alert>
                    {loading? 'Loading...' : error}
                </Alert>
            );
            
        }

        return(
            <QuestionWrapper>
                
               <Card key={data.items[0].question_id} data={data.items[0]} />
            </QuestionWrapper>
        );
    }
}

export default Question;