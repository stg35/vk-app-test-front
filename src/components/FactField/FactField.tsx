import { Button, Group, Header, Textarea } from '@vkontakte/vkui';
import styles from './factField.module.scss';
import { IGetFactResponse, getFact } from '../../api/getFact';
import { useQuery } from '@tanstack/react-query';

export const FactField = (): JSX.Element => {
	const { data, refetch } = useQuery<IGetFactResponse>({
		queryKey: ['fact'],
		queryFn: getFact,
		enabled: false,
		refetchOnWindowFocus: false,
	});

	const handleReceiveButton = (): void => {
		refetch();
	};

	return (
		<Group className={styles['group']} header={<Header mode="secondary">Факты</Header>}>
			<div className={styles['group__form']}>
				<Textarea value={data ? data.fact : ''} rows={5} readOnly />
				<Button
					className={styles['group__form__button']}
					size="m"
					onClick={() => handleReceiveButton()}
				>
					Получить факт
				</Button>
			</div>
		</Group>
	);
};
