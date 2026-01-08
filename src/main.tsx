import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import Global from './components/global'
import App from './pages/app'

import '@/styles/global.less'
import Loading from "@/components/loading";

const bootstrap = async () => {
	if (import.meta.env.DEV) {
		const {worker} = await import('../mocks/browser')
		await worker.start({onUnhandledRequest: 'bypass'})
	}

	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		// @ts-ignore
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Global>
				<React.Suspense
					fallback={(
						<div
							style={{
								width: '100vw',
								height: '100vh',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<Loading rotate width="3em" height="3em"/>
						</div>
					)}
				>
					<App/>
				</React.Suspense>
			</Global>
		</BrowserRouter>
	)
}

void bootstrap()
