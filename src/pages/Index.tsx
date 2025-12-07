import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Спортивные леггинсы',
    price: 2490,
    category: 'Одежда',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
    description: 'Высокая посадка, дышащая ткань'
  },
  {
    id: 2,
    name: 'Спортивный топ',
    price: 1290,
    category: 'Одежда',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    description: 'Поддержка и комфорт'
  },
  {
    id: 3,
    name: 'Гантели 2 кг (пара)',
    price: 1490,
    category: 'Инвентарь',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
    description: 'Неопреновое покрытие'
  },
  {
    id: 4,
    name: 'Протеиновый коктейль',
    price: 1890,
    category: 'Питание',
    image: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400&h=400&fit=crop',
    description: 'Ванильный вкус, 25г белка'
  },
  {
    id: 5,
    name: 'Бутылка для воды 750мл',
    price: 790,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
    description: 'Тритан, без BPA'
  },
  {
    id: 6,
    name: 'Фитнес-резинки (набор)',
    price: 990,
    category: 'Инвентарь',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop',
    description: '3 уровня сопротивления'
  },
  {
    id: 7,
    name: 'Коврик для йоги',
    price: 1990,
    category: 'Инвентарь',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    description: 'Нескользящий, 6мм'
  },
  {
    id: 8,
    name: 'Витамины для спортсменов',
    price: 1590,
    category: 'Питание',
    image: 'https://images.unsplash.com/photo-1550572017-4a2c9e1e6e66?w=400&h=400&fit=crop',
    description: 'Комплекс на 30 дней'
  },
  {
    id: 9,
    name: 'Спортивная сумка',
    price: 2290,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Вместительная, водоотталкивающая'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Мария Смирнова',
    rating: 5,
    text: 'Леггинсы просто огонь! Не скатываются, идеально сидят. Беру уже третью пару!',
    date: '02.12.2024'
  },
  {
    id: 2,
    name: 'Анастасия К.',
    rating: 5,
    text: 'Гантели отличного качества, покрытие не скользит. Довольна покупкой!',
    date: '28.11.2024'
  },
  {
    id: 3,
    name: 'Екатерина Волкова',
    rating: 5,
    text: 'Протеин вкусный, хорошо размешивается. Результаты после тренировок радуют!',
    date: '20.11.2024'
  },
  {
    id: 4,
    name: 'Дарья Новикова',
    rating: 4,
    text: 'Резинки супер для домашних тренировок! Качество на высоте.',
    date: '15.11.2024'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [calories, setCalories] = useState<number | null>(null);
  
  const [workouts, setWorkouts] = useState<{date: string; type: string; duration: number}[]>([]);
  const [newWorkoutType, setNewWorkoutType] = useState('');
  const [newWorkoutDuration, setNewWorkoutDuration] = useState('');

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
        setShowPaymentDialog(false);
        setCart([]);
      }, 2000);
    }, 2000);
  };
  
  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const act = parseFloat(activity);
    
    if (w && h && a) {
      const bmr = 447.6 + (9.2 * w) + (3.1 * h) - (4.3 * a);
      const tdee = Math.round(bmr * act);
      setCalories(tdee);
    }
  };
  
  const addWorkout = () => {
    if (newWorkoutType && newWorkoutDuration) {
      const today = new Date().toLocaleDateString('ru-RU');
      setWorkouts([...workouts, {
        date: today,
        type: newWorkoutType,
        duration: parseInt(newWorkoutDuration)
      }]);
      setNewWorkoutType('');
      setNewWorkoutDuration('');
    }
  };
  
  const totalWorkoutTime = workouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Dumbbell" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                FitGirl Shop
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('home')}
                className={`transition-colors ${
                  activeSection === 'home' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection('catalog')}
                className={`transition-colors ${
                  activeSection === 'catalog' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`transition-colors ${
                  activeSection === 'about' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection('delivery')}
                className={`transition-colors ${
                  activeSection === 'delivery' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Доставка
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className={`transition-colors ${
                  activeSection === 'reviews' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`transition-colors ${
                  activeSection === 'contacts' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'
                }`}
              >
                Контакты
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина ({totalItems})</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingCart" className="mx-auto text-muted-foreground mb-4" size={48} />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {cart.map((item) => (
                          <Card key={item.id}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFromCart(item.id)}
                                      className="ml-auto"
                                    >
                                      <Icon name="Trash2" size={16} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={() => setShowPaymentDialog(true)}>
                          <Icon name="CreditCard" size={20} className="mr-2" />
                          Оплатить
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Твой фитнес-старт
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Спортивная одежда, инвентарь и питание для твоих тренировок
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('catalog')}>
              Перейти к покупкам
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-shadow">
              <Icon name="Sparkles" className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Качественные материалы</h3>
              <p className="text-gray-600">Дышащие ткани и проверенные бренды</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-shadow">
              <Icon name="Heart" className="mx-auto text-secondary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Для каждой девушки</h3>
              <p className="text-gray-600">Размеры XS-XXL, широкий выбор цветов</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-rose-200 hover:shadow-lg transition-shadow">
              <Icon name="Truck" className="mx-auto text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">1-3 дня по России, примерка при получении</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-white/40">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Хиты продаж
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-secondary">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/40">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Твои фитнес-инструменты
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-3">
                  <Icon name="Calculator" className="text-primary" size={32} />
                  <h3 className="text-2xl font-bold">Калькулятор калорий</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="60"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="165"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Возраст</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity">Активность</Label>
                    <select
                      id="activity"
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="1.2">Минимальная</option>
                      <option value="1.375">Легкая (1-3 раз/нед)</option>
                      <option value="1.55">Средняя (3-5 раз/нед)</option>
                      <option value="1.725">Высокая (6-7 раз/нед)</option>
                      <option value="1.9">Экстремальная</option>
                    </select>
                  </div>
                </div>
                <Button onClick={calculateCalories} className="w-full">
                  <Icon name="Zap" size={20} className="mr-2" />
                  Рассчитать
                </Button>
                {calories && (
                  <div className="bg-primary/10 rounded-lg p-4 text-center animate-scale-in">
                    <p className="text-sm text-muted-foreground mb-1">Ваша норма:</p>
                    <p className="text-3xl font-bold text-primary">{calories} ккал/день</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
                <div className="flex items-center gap-3">
                  <Icon name="TrendingUp" className="text-secondary" size={32} />
                  <h3 className="text-2xl font-bold">Трекер тренировок</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="workout-type">Тип тренировки</Label>
                    <Input
                      id="workout-type"
                      placeholder="напр.: Йога, Силовая, Кардио"
                      value={newWorkoutType}
                      onChange={(e) => setNewWorkoutType(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workout-duration">Длительность (мин)</Label>
                    <Input
                      id="workout-duration"
                      type="number"
                      placeholder="45"
                      value={newWorkoutDuration}
                      onChange={(e) => setNewWorkoutDuration(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={addWorkout} className="w-full">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить тренировку
                </Button>
                
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">Всего тренировок:</p>
                    <Badge className="bg-secondary">{workouts.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Общее время:</p>
                    <p className="text-2xl font-bold text-secondary">{totalWorkoutTime} мин</p>
                  </div>
                </div>
                
                {workouts.length > 0 && (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {workouts.slice(-5).reverse().map((workout, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{workout.type}</p>
                          <p className="text-xs text-muted-foreground">{workout.date}</p>
                        </div>
                        <Badge variant="outline">{workout.duration} мин</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О нас</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-200">
            <p className="text-lg text-gray-700 mb-6">
              FitGirl Shop — твой надежный партнер в мире фитнеса! Мы создали магазин специально для девушек,
              которые ценят качество, комфорт и стиль в спорте.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Наша команда сама тренируется и знает, что важно для тренировок. Только проверенные бренды,
              удобная одежда и эффективное спортивное питание.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">15K+</p>
                <p className="text-gray-600">Спортивных девушек</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-secondary mb-2">500+</p>
                <p className="text-gray-600">Товаров для фитнеса</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-accent mb-2">99%</p>
                <p className="text-gray-600">Рекомендуют подругам</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка и оплата</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-3">
                  <Icon name="Truck" className="text-primary" size={32} />
                  <h3 className="text-2xl font-bold">Способы доставки</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Home" className="text-primary mt-1" size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">Курьером по Москве</h4>
                    <p className="text-sm text-gray-600 mb-2">Доставка в день заказа</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Стоимость:</span>
                      <span className="font-bold text-primary">300 ₽</span>
                    </div>
                    <div className="mt-2 text-xs text-green-600 font-semibold">
                      Бесплатно от 3000 ₽
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Package" className="text-secondary mt-1" size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">Почта России</h4>
                    <p className="text-sm text-gray-600 mb-2">Доставка 5-10 дней</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Стоимость:</span>
                      <span className="font-bold text-secondary">от 250 ₽</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="MapPin" className="text-accent mt-1" size={24} />
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">Пункты выдачи (CDEK, Boxberry)</h4>
                    <p className="text-sm text-gray-600 mb-2">Доставка 3-7 дней</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Стоимость:</span>
                      <span className="font-bold text-accent">от 200 ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10">
                <div className="flex items-center gap-3">
                  <Icon name="CreditCard" className="text-accent" size={32} />
                  <h3 className="text-2xl font-bold">Способы оплаты</h3>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Smartphone" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Онлайн на сайте</h4>
                    <p className="text-sm text-gray-600">Банковские карты, ЮКасса, СБП</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Banknote" className="text-secondary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">При получении</h4>
                    <p className="text-sm text-gray-600">Наличными или картой курьеру</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Icon name="Wallet" className="text-accent mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">В пункте выдачи</h4>
                    <p className="text-sm text-gray-600">Наличными или картой при получении</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="ShieldCheck" className="text-green-600" size={20} />
                    <h4 className="font-bold text-green-800">Гарантии безопасности</h4>
                  </div>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• SSL-шифрование данных</li>
                    <li>• Возможность примерки</li>
                    <li>• Возврат в течение 14 дней</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-200">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Info" className="text-primary" size={32} />
              <h3 className="text-2xl font-bold">Важная информация</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Icon name="Clock" size={20} className="text-primary" />
                  Сроки обработки
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>Заказы до 14:00 отправляются в тот же день</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>Заказы после 14:00 — на следующий день</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>В выходные отправка в понедельник</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Icon name="Package" size={20} className="text-secondary" />
                  Упаковка
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>Безопасная упаковка с защитой</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>Нейтральный дизайн коробки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-green-600 mt-1" />
                    <span>Бесплатная подарочная упаковка</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-white/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-rose-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="MapPin" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Адрес</h4>
                    <p className="text-gray-600">г. Москва, ул. Спортивная, д. 45</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="Phone" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Телефон</h4>
                    <p className="text-gray-600">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="Mail" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-gray-600">hello@fitgirl-shop.ru</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Режим работы</h4>
                <p className="text-gray-600 mb-2">Пн-Пт: 9:00 - 21:00</p>
                <p className="text-gray-600 mb-2">Сб-Вс: 10:00 - 20:00</p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" size="icon">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Twitter" size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-rose-400 via-stone-500 to-amber-300 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">© 2024 FitGirl Shop. Все права защищены.</p>
          <p className="text-sm mt-2 opacity-90">Тренируйся с удовольствием 💪</p>
        </div>
      </footer>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {paymentSuccess ? 'Оплата успешна!' : 'Оформление заказа'}
            </DialogTitle>
          </DialogHeader>
          {paymentSuccess ? (
            <div className="py-8 text-center animate-scale-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Check" size={48} className="text-green-600" />
              </div>
              <p className="text-lg font-semibold mb-2">Спасибо за покупку!</p>
              <p className="text-muted-foreground">Ваш заказ принят в обработку</p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Товаров:</span>
                  <span className="font-semibold">{totalItems} шт.</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Иван Иванов" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <Label htmlFor="address">Адрес доставки</Label>
                  <Input id="address" placeholder="г. Москва, ул. Примерная, д. 1" />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оплатить {totalPrice.toLocaleString()} ₽
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>Безопасная оплата SSL</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}