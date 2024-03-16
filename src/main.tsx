import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@vkontakte/vkui/dist/vkui.css';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import bridge from '@vkontakte/vk-bridge';

bridge.send('VKWebAppInit');

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ConfigProvider>
			<AdaptivityProvider>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</AdaptivityProvider>
		</ConfigProvider>
	</React.StrictMode>,
);
