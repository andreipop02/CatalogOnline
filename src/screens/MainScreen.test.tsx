import { fireEvent, render, screen} from '@testing-library/react';
import MainScreen from './MainScreen';

test('renders the main screen', () => {
  render(<MainScreen />);

  const paginaElevului = screen.getByText("Selecteaza CLASA");
  fireEvent.click(paginaElevului)
  
});