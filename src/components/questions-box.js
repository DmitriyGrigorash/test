import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid, InputAdornment, TextField,
  Typography,
  Grow
} from "@mui/material";

import {fetchCityWeather} from "../actions/main";

export const QuestionsBox = (props) => {
  const dispatch = useDispatch();
  const mainState = useSelector((state) => state.main);

  const [values, setValues] = useState([]);
  const [formState, setFormState] = useState({cityName: '', guessTemp: ''});
  const [counter, setCounter] = useState({
    cityIndex: 0,
    city: {
      name: '',
      temp: 0
    },
    finish: false,
    rightAnswers: 0
  });

  const handleChange = (event, cityName) => {
    const value = Number(event.target.value);
    setFormState({cityName: cityName, guessTemp: value});
  };

  const handleSave = () => {
    if (!formState.cityName || counter.finish) {
      return;
    }
    setValues(prevState => {
      let res = {};
      if (counter.city.name === formState.cityName) {
        if (counter.city.temp === formState.guessTemp) {
          res = {...counter.city, guessTemp: formState.guessTemp, rightAnswer: true};
        } else {
          res = {...counter.city, guessTemp: formState.guessTemp, rightAnswer: false};
        }
      }
      return [...prevState, res];
    });

    if (counter.cityIndex === mainState.cities.length - 1) {
      setCounter(prevState => {
        return { ...prevState, finish: true};
      });
    } else {
      setCounter(prevState => {
        const nextIndex = prevState.cityIndex + 1;
        const city = mainState.cities[nextIndex];
        return { ...prevState, cityIndex: nextIndex, city };
      });
    }
    setFormState({cityName: '', guessTemp: ''});
  };

  useEffect(() => {
    fetchCityWeather(dispatch);
  }, []);

  useEffect(() => {
    if (mainState.cities.length) {
      const city = mainState.cities[0];
      setCounter(prevState => {
        return { ...prevState, cityIndex: 0, city };
      });
    }
  }, [mainState.loading]);

  useEffect(() => {
    if (counter.finish) {
      const checkRes = values.reduce((previousValue, current) => {
        if (current.rightAnswer) {
          return previousValue + 1;
        }
        return previousValue;
      }, 0);
      setCounter(prevState => ({ ...prevState, rightAnswers: checkRes}));
    }
  }, [values]);

  return (
    <Container maxWidth='lg'>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div className='questions-box' style={{height: '160'}}>
          <Grow in={!counter.finish} unmountOnExit>
            <Card sx={{ width: 400 }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">Write your guess</Typography>

                <TextField
                  value={formState.guessTemp}
                  label={`Temperature in ${counter.city.name} city?`}
                  type='number'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">&#8451;</InputAdornment>,
                  }}
                  onChange={(event) => handleChange(event, counter.city.name)}
                />

              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </CardActions>
            </Card>
          </Grow>

          <Grow
            in={counter.finish}
            style={!counter.finish ? {height: '0'} : {height: 'auto'}}
            unmountOnExit
            mountOnEnter
            {...(counter.finish ? { timeout: 2000 } : {})}
          >
            <Card sx={{ width: 400 }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">Results</Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                  <p>{counter.rightAnswers >= 3 ? 'You win! :)' : 'You lose... :('}</p>
                  <p>{counter.rightAnswers > 0 ? `You have ${counter.rightAnswers} correct answers` :
                    'No correct answers!'}</p>
                </Typography>
              </CardContent>
            </Card>
          </Grow>
        </div>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{marginTop: '30px'}}
        >
          {values.length ? values.map(value => {
            return (
              <Grid
                item
                style={{padding: '20px 10px'}}
                key={value.name}
              >
                <div style={counter.finish && !value.rightAnswer ? {color: 'red'} : {}}>
                  <Typography variant="h6" gutterBottom component="div">
                    {value.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Guess: {value.guessTemp}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Current temperature: {value.temp}
                  </Typography>
                </div>
              </Grid>
            );
          }) : null}
        </Grid>
      </Grid>
    </Container>
  )
};
