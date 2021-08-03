import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-modal';
import QuestionList from './QuestionList.jsx';
import SearchBar from './SearchBar.jsx';

const Button = styled.a`
  border-style: solid;
  border-width: thin;
  font-size: 1.2em;
  margin-right: 1em;
  padding: 1.5em;
  font-family: Helvetica, Arial, sans-serif;
`

const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 5em;
`

const QWrapper = styled.span`
  margin-top: 5em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-family: Helvetica, Arial, sans-serif;
`

const QuestionInput = styled.textarea`
  margin-bottom: 1em;
  height: 30vh;
  width: 40vw;
`

const Input = styled.input`
  margin-bottom: 1em;
  width: 40vw;
`

const Submit = styled.input`
  border-radius: 10%;
  width: 7em;
`

Modal.setAppElement('body');

const QA = (props) => {
  const [questions, setQuestions] = useState([]);
  const [questionsExpanded, setQuestionsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [questionModal, setQuestionModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    searchValue.length < 3 ? setCurrentQuestions(questions) :  setCurrentQuestions(questions.reduce((acc, val) => {
      if (val.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
        acc.push(val);
      }
      return acc;
    }, []));
  }, [searchValue]);
  useEffect(() => {
    fetchQuestions();
      axios.get(`/products/${props.productId}`)
      .then((res) => setProductName(res.data.name))
  }, []);

  const fetchQuestions = () => {
    axios.get(`/questions?productId=${props.productId}`)
      .then((res) => {setQuestions(res.data.results); setCurrentQuestions(res.data.results)})
      .catch(err => {
        // console.log(err);
      });
  }

  const handleNewQuestionChange = (event) => {
      setNewQuestion(event.target.value);
  };

  const handleNicknameChange = (event) => {
      setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let missing = '';
    if (newQuestion.length === 0) {
      missing += ' question';
    } if (nickname.length === 0) {
      missing += ' nickname';
    } if (email.length === 0) {
      missing += ' email';
    }
    var properEmail = false;
    if (email.split('@')[1]) {
      if (email.split('@')[1].split('.')[1]) {
        properEmail = true;
      }
    }
    if (missing.length !== 0) {
      alert(`You must enter the following:${missing}`)
    } else if (!properEmail) {
      alert('You must provide an email in a proper format: someone@something.com')
    } else {
      axios.post('/questions', {
        "body": newQuestion,
        "name": nickname,
        "email": email,
        "product_id": props.productId
      })
      .then(() => {
        fetchQuestions();
        setQuestionModal(false);
      })
      .catch((err) => {
        alert('error in posting message');
        setQuestionModal(false);
      });
    }
  }

  return (
    <div onClick={(e, moduleElem) => props.handleClick(e, 'QA')}>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <QWrapper>
        <QuestionList fetchQuestions={fetchQuestions} productName={productName} questions={currentQuestions} productId={props.productId} questionsExpanded={questionsExpanded} />
      </QWrapper>
      <Wrapper>
        <Button onClick={() => setQuestionsExpanded(!questionsExpanded)}>{questionsExpanded ? 'LESS ANSWERED QUESTIONS' : 'MORE ANSWERED QUESTIONS'}</Button>
        <Button onClick={() => setQuestionModal(true)}>ADD A QUESTION  +</Button>
        <Modal
        isOpen={questionModal}
        onRequestClose={() => setQuestionModal(false)}>
          <Form onSubmit={handleSubmit}>
            <div style={{fontSize: '1.3em', fontFamily: 'Helvetica, Arial, sans-serif' }}>Ask Your Question</div>
            <div style={{fontSize: '1.1em', fontFamily: 'Helvetica, Arial, sans-serif', marginBottom: '2em'}}>About the {productName}:</div>
            <label>Your Question*</label>
            <QuestionInput value={newQuestion} maxLength="1000" onChange={handleNewQuestionChange}></QuestionInput>
            <label>What is your nickname*</label>
            <Input value={nickname} placeholder="Example: jackson11!" type="text" maxLength="60" onChange={handleNicknameChange}></Input>
            <div style={{fontSize: '0.65em', marginBottom: '0.5em'}}>For privacy reasons, do not use your full name or email address</div>
            <label>Your email*</label>
            <Input value={email} type="text" placeholder="Why did you like the product or not?" maxLength="60" onChange={handleEmailChange}></Input>
            <div style={{fontSize: '0.65em', marginBottom: '0.5em'}}>For authentication reasons, you will not be emailed</div>
            <Submit type="submit" value="Submit"></Submit>
          </Form>
        </Modal>
      </Wrapper>
    </div>
  );
};

export default QA;