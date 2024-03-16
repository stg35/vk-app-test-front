import { AppRoot } from '@vkontakte/vkui';
import { FactField } from './components/FactField/FactField';
import { AgeForm } from './components/AgeForm/AgeForm';
import styles from './app.module.scss';

function App(): JSX.Element {
	return (
		<AppRoot>
			<div className={styles['main']}>
				<FactField />
				<AgeForm />
			</div>
		</AppRoot>
	);
}

export default App;
