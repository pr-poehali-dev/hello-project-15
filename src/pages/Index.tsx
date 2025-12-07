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
    name: 'Беспроводные наушники',
    price: 5990,
    category: 'Аудио',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Премиальное качество звука'
  },
  {
    id: 2,
    name: 'Смарт-часы',
    price: 12990,
    category: 'Гаджеты',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    description: 'Отслеживание активности'
  },
  {
    id: 3,
    name: 'Рюкзак для ноутбука',
    price: 3490,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    description: 'Вместительный и стильный'
  },
  {
    id: 4,
    name: 'Портативная колонка',
    price: 4590,
    category: 'Аудио',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    description: 'Мощный звук 360°'
  },
  {
    id: 5,
    name: 'Фитнес-браслет',
    price: 2990,
    category: 'Гаджеты',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
    description: 'Контроль здоровья 24/7'
  },
  {
    id: 6,
    name: 'Чехол для телефона',
    price: 890,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    description: 'Защита и стиль'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    rating: 5,
    text: 'Отличный магазин! Быстрая доставка и качественные товары.',
    date: '15.11.2024'
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    rating: 5,
    text: 'Заказывал наушники - звук просто супер! Рекомендую.',
    date: '10.11.2024'
  },
  {
    id: 3,
    name: 'Елена Сидорова',
    rating: 4,
    text: 'Хороший выбор товаров, удобный интерфейс сайта.',
    date: '05.11.2024'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="ShoppingBag" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ShopVibe
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
              Стиль начинается здесь
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Откройте для себя уникальные товары с быстрой доставкой и безопасной оплатой
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('catalog')}>
              Перейти к покупкам
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-shadow">
              <Icon name="Truck" className="mx-auto text-primary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставим за 1-3 дня по всей стране</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-shadow">
              <Icon name="Shield" className="mx-auto text-secondary mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Безопасная оплата</h3>
              <p className="text-gray-600">SSL-шифрование и проверенные платежные системы</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-shadow">
              <Icon name="Award" className="mx-auto text-accent mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Только оригинальные товары от производителей</p>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 px-4 bg-white/40">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Популярные товары
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

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О нас</h2>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-100">
            <p className="text-lg text-gray-700 mb-6">
              ShopVibe — это современный интернет-магазин, где каждый найдет что-то особенное. Мы тщательно
              отбираем товары, чтобы предложить вам только лучшее.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Наша команда работает с 2020 года и за это время мы обслужили более 50 000 довольных клиентов.
              Мы верим в качество, честность и отличный сервис.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">50K+</p>
                <p className="text-gray-600">Довольных клиентов</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-secondary mb-2">10K+</p>
                <p className="text-gray-600">Товаров в каталоге</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-accent mb-2">98%</p>
                <p className="text-gray-600">Положительных отзывов</p>
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
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <Icon name="MapPin" className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-bold mb-1">Адрес</h4>
                    <p className="text-gray-600">г. Москва, ул. Примерная, д. 123</p>
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
                    <p className="text-gray-600">info@shopvibe.ru</p>
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

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">© 2024 ShopVibe. Все права защищены.</p>
          <p className="text-sm mt-2 opacity-90">Безопасные покупки с любовью ❤️</p>
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