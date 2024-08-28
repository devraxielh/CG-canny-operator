import React, { useState, useEffect, useCallback } from 'react';
import { Camera, ZoomIn, ArrowUpDown, Scissors, SlidersHorizontal, Image, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const CannyEdgeAnimatedExplanation = () => {
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [activeTab, setActiveTab] = useState('animation');
    const [gaussianBlur, setGaussianBlur] = useState(2);
    const [lowThreshold, setLowThreshold] = useState(20);
    const [highThreshold, setHighThreshold] = useState(60);

    const steps = [
        {
        title: "Imagen Original",
        icon: <Camera size={48} />,
        description: "Se parte de una imagen en escala de grises.",
        animation: "opacity"
        },
        {
        title: "Suavizado Gaussiano",
        icon: <ZoomIn size={48} />,
        description: "Se aplica un filtro gaussiano para reducir el ruido.",
        animation: "blur"
        },
        {
        title: "Cálculo de Gradientes",
        icon: <ArrowUpDown size={48} />,
        description: "Se calculan las derivadas en X e Y para detectar cambios de intensidad.",
        animation: "gradient"
        },
        {
        title: "Supresión No Máxima",
        icon: <Scissors size={48} />,
        description: "Se adelgazan los bordes, manteniendo solo los máximos locales.",
        animation: "thin"
        },
        {
        title: "Umbralización",
        icon: <SlidersHorizontal size={48} />,
        description: "Se aplican umbrales para determinar los bordes fuertes y débiles.",
        animation: "threshold"
        },
        {
        title: "Bordes Detectados",
        icon: <Image size={48} />,
        description: "Resultado final con los bordes detectados.",
        animation: "final"
        }
    ];

    const nextStep = useCallback(() => {
        setStep((prevStep) => (prevStep + 1) % steps.length);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    }, [steps.length]);

    const prevStep = useCallback(() => {
        setStep((prevStep) => (prevStep - 1 + steps.length) % steps.length);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    }, [steps.length]);

    useEffect(() => {
        let timer;
        if (isPlaying) {
        timer = setInterval(nextStep, 4000);
        }
        return () => clearInterval(timer);
    }, [isPlaying, nextStep]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const getAnimationClass = () => {
        switch (steps[step].animation) {
        case "blur": return "animate-pulse";
        case "gradient": return "animate-gradient";
        case "thin": return "animate-thin";
        case "threshold": return "animate-threshold";
        case "final": return "animate-final";
        default: return "animate-fade-in";
        }
    };

    const applyCannyEffect = (blur, low, high) => {
        return {
        filter: `blur(${blur}px) contrast(${low + 100}%) brightness(${high}%)`,
        };
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
            <div className="mb-6">
            <div className="flex justify-between">
                <button
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'animation' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('animation')}
                >
                Animación
                </button>
                <button 
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'demo' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('demo')}
                >
                Demostración
                </button>
                <button 
                className={`px-4 py-2 rounded-t-lg ${activeTab === 'interactive' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setActiveTab('interactive')}
                >
                Interactivo
                </button>
            </div>
            </div>
            
            {activeTab === 'animation' && (
            <div className="flex flex-col items-center">
                <div className={`w-64 h-64 bg-gray-300 rounded-lg shadow-inner flex items-center justify-center mb-4 ${isAnimating ? getAnimationClass() : ''}`}>
                {steps[step].icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{steps[step].title}</h3>
                <p className="text-sm text-center mb-4">{steps[step].description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
                </div>
                <div className="flex space-x-4">
                <button onClick={prevStep} className="p-2 bg-gray-200 rounded-full">
                    <SkipBack size={24} />
                </button>
                <button onClick={togglePlay} className="p-2 bg-gray-200 rounded-full">
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button onClick={nextStep} className="p-2 bg-gray-200 rounded-full">
                    <SkipForward size={24} />
                </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">Paso {step + 1} de {steps.length}</p>
            </div>
            )}
            {activeTab === 'demo' && (
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <img src="./assets/300.png" alt="Imagen Original" className="w-64 h-64 object-cover rounded" />
                    <p className="mt-2 font-semibold">Imagen Original</p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="./assets/300.png" alt="Bordes Detectados" className="w-64 h-64 object-cover rounded invert" />
                    <p className="mt-2 font-semibold">Bordes Detectados</p>
                </div>
                </div>
                <p className="text-sm text-center mt-4">
                Esta demostración muestra cómo se vería una imagen antes y después de aplicar el Operador Canny. 
                Los bordes detectados se muestran como líneas blancas sobre un fondo negro.
                </p>
            </div>
            )}

            {activeTab === 'interactive' && (
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex flex-col items-center">
                    <img src="./assets/300.png" alt="Imagen Original" className="w-64 h-64 object-cover rounded" />
                    <p className="mt-2 font-semibold">Imagen Original</p>
                </div>
                <div className="flex flex-col items-center">
                    <img 
                    src="./assets/300.png" 
                    alt="Bordes Detectados" 
                    className="w-64 h-64 object-cover rounded invert" 
                    style={applyCannyEffect(gaussianBlur, lowThreshold, highThreshold)}
                    />
                    <p className="mt-2 font-semibold">Bordes Detectados</p>
                </div>
                </div>
                <div className="w-full max-w-md space-y-4 mt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suavizado Gaussiano: {gaussianBlur}px
                    </label>
                    <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    step="0.1" 
                    value={gaussianBlur}
                    onChange={(e) => setGaussianBlur(Number(e.target.value))}
                    className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Umbral Bajo: {lowThreshold}
                    </label>
                    <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={lowThreshold}
                    onChange={(e) => setLowThreshold(Number(e.target.value))}
                    className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Umbral Alto: {highThreshold}
                    </label>
                    <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={highThreshold}
                    onChange={(e) => setHighThreshold(Number(e.target.value))}
                    className="w-full"
                    />
                </div>
                </div>
                <p className="text-sm text-center mt-4">
                Ajusta los controles deslizantes para ver cómo los diferentes parámetros afectan la detección de bordes.
                Esta es una simulación simplificada y no representa con precisión el algoritmo real de Canny.
                </p>
            </div>
            )}
        </div>
        </div>
    );
};

export default CannyEdgeAnimatedExplanation;
