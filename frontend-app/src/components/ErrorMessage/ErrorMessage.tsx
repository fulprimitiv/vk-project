import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
	message: string;
	onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
	return (
		<div className="error-message-container">
			<div className="error-icon">⚠️</div>
			<p className="error-text">{message}</p>
			{onRetry && (
				<button onClick={onRetry} className="retry-button">
					Попробовать снова
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;