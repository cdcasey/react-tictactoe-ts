import { connect } from 'react-redux';
//test
import {
  historySelector,
  stepNumberSelector,
  xIsNextSelector,
  winnerSelector,
  selectSquare,
} from 'components/Game/gameSlice';
import Board from './Board';
import { RootState } from 'store';

function mapStateToProps(state: RootState) {
  return {
    history: historySelector(state),
    stepNumber: stepNumberSelector(state),
    xIsNext: xIsNextSelector(state),
    winner: winnerSelector(state),
  };
}

const mapDispatchToProps = {
  selectSquare,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
