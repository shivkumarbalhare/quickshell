import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock, CreditCard, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentStatusProps {
  isProcessing: boolean;
  paymentMethod: string;
  amount: number;
  onComplete?: () => void;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ 
  isProcessing, 
  paymentMethod, 
  amount, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [transactionId] = useState(`TXN${Date.now().toString().slice(-8)}`);

  const paymentSteps = [
    { name: 'Initializing Payment', icon: Clock, color: 'text-blue-500' },
    { name: 'Validating Details', icon: Shield, color: 'text-yellow-500' },
    { name: 'Processing Transaction', icon: CreditCard, color: 'text-purple-500' },
    { name: 'Payment Confirmed', icon: CheckCircle, color: 'text-green-500' }
  ];

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < paymentSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            onComplete?.();
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing, onComplete]);

  if (!isProcessing) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h3>
          <p className="text-gray-600">Please wait while we process your transaction</p>
        </div>

        <div className="space-y-4 mb-6">
          {paymentSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: isActive || isCompleted ? 1 : 0.5,
                  scale: isActive ? 1.05 : 1
                }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  isActive ? 'bg-blue-50 border border-blue-200' : 
                  isCompleted ? 'bg-green-50 border border-green-200' : 
                  'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : 
                  isActive ? 'bg-blue-500' : 'bg-gray-300'
                }`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-blue-900' : 
                  isCompleted ? 'text-green-900' : 'text-gray-600'
                }`}>
                  {step.name}
                </span>
                {isActive && (
                  <div className="ml-auto">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                  </div>
                )}
                {isCompleted && (
                  <div className="ml-auto">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-mono text-gray-900">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium text-gray-900">{paymentMethod.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-gray-900">₹{amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Secured by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStatus;