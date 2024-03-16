import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, FormItem, Group, Header, Input } from '@vkontakte/vkui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { IGetAgeResponse, getAge } from '../../api/getAge';
import { useEffect, useState } from 'react';
import styles from './ageForm.module.scss';

const validationSchema = yup.object().shape({
	name: yup.string().required('Введите имя'),
});

type TForm = yup.InferType<typeof validationSchema>;

export const AgeForm = (): JSX.Element => {
	const [queryKey] = useState('age');
	const [name, setName] = useState<string>('');
	const [input, setInput] = useState<string>();
	const queryClient = useQueryClient();

	const {
		handleSubmit,
		control,
		formState: { errors },
		watch,
	} = useForm<TForm>({
		resolver: yupResolver(validationSchema),
		mode: 'onChange',
	});

	const { data } = useQuery<IGetAgeResponse>({
		queryKey: [queryKey, name],
		queryFn: ({ signal }) => getAge(name, { signal }),
		refetchOnWindowFocus: false,
		staleTime: 86400000,
		enabled: !!name,
	});

	useEffect(() => {
		const subscription = watch((data) => setInput(data?.name));
		return () => subscription.unsubscribe();
	}, [handleSubmit, watch]);

	useEffect(() => {
		const delayDebounce = setTimeout(() => {
			input && setName(input);
		}, 3000);

		return () => clearTimeout(delayDebounce);
	}, [input]);

	const onSubmit: SubmitHandler<TForm> = (data) => {
		setName(data.name);
		queryClient.cancelQueries({ queryKey: [queryKey] });
	};

	return (
		<Group className={styles['group']} header={<Header mode="secondary">Получить возраст</Header>}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormItem
					htmlFor="name"
					top="Имя"
					status={errors.name && 'error'}
					bottom={errors.name ? errors.name.message : data?.age ? `Возраст: ${data.age}` : ''}
					noPadding={true}
				>
					<Controller
						name="name"
						control={control}
						render={({ field }) => <Input {...field} id="name" />}
					/>
				</FormItem>
				<Button type="submit" size="m">
					Отправить
				</Button>
			</form>
		</Group>
	);
};
