from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Stock(models.Model):
    symbol = models.CharField(max_length=10,unique=True,help_text="Unique ticker symbol of the stock (e.g., 'AAPL', 'NEPSE')")
    company_name = models.CharField(max_length=255,help_text="Full name of the company (e.g., 'Apple Inc.')")
    exchange = models.CharField(max_length=50,help_text="Stock exchange where the stock is traded (e.g., 'NASDAQ', 'NEPSE')")
    
    current_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text="Last traded price of the stock")
    price_change = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text="Change in price from previous close")
    percent_change = models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True,help_text="Percentage change in price")
    volume = models.BigIntegerField(null=True,blank=True,help_text="Trading volume for the day")
    last_updated = models.DateTimeField(auto_now=True,help_text="Timestamp of the last update to this stock's data")
    description = models.TextField(blank=True,null=True,help_text="Brief description or overview of the company")
    industry = models.CharField(max_length=100,blank=True,null=True,help_text="Industry sector the company belongs to")

    class Meta:
        ordering = ['symbol']
        verbose_name = "Stock"
        verbose_name_plural = "Stocks"

    def __str__(self):
        return f"{self.symbol} - {self.company_name}"

class NewsArticle(models.Model):
    STATUS_CHOICES = [('Draft', 'Draft'),('Published', 'Published'),('Archived', 'Archived'),]

    title = models.CharField(max_length=255,help_text="Title of the news article")
    slug = models.SlugField(max_length=255,unique=True,help_text="A short label for the URL (auto-generated from title)")
    author = models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True,related_name='news_articles',help_text="The user who authored this article")
    content = models.TextField(help_text="Full content of the news article")
    published_date = models.DateTimeField(auto_now_add=True,help_text="Date and time when the article was published")
    last_modified = models.DateTimeField(auto_now=True,help_text="Timestamp of the last modification to the article")
    status = models.CharField(max_length=10,choices=STATUS_CHOICES,default='Draft',help_text="Publication status of the article")
    related_stocks = models.ManyToManyField(Stock,blank=True,related_name='news_articles',help_text="Stocks mentioned or related to this article")

    class Meta:
        ordering = ['-published_date']
        verbose_name = "News Article"
        verbose_name_plural = "News Articles"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        from django.utils.text import slugify
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,related_name='profile',help_text="The associated Django User instance")
    bio = models.TextField(blank=True,null=True,help_text="A short biography of the user")

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"

    def __str__(self):
        return f"Profile for {self.user.username}"
    
class MarketOverview(models.Model):
    nepse_index = models.DecimalField(max_digits=10,decimal_places=2,help_text="Current value of the NEPSE Index")
    nepse_index_change = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,help_text="Change in NEPSE Index from previous close (in points)")
    nepse_index_percent_change = models.DecimalField(max_digits=4,decimal_places=1,null=True,blank=True,help_text="Percentage change in NEPSE Index")

    total_market_cap = models.DecimalField(max_digits=8, decimal_places=2,help_text="Total market capitalization (in NPR Crores/Billions)")
    market_cap_change = models.DecimalField(max_digits=4,decimal_places=1,null=True,blank=True,help_text="Change in total market capitalization (in number)")
    market_cap_percent_change = models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True,help_text="Percentage change in total market capitalization")

    volume_traded = models.BigIntegerField(help_text="Total trading volume for the day (number of shares)")
    volume_traded_change = models.BigIntegerField(null=True,blank=True,help_text="Change in total trading volume (in number)")
    volume_traded_percent_change = models.DecimalField(max_digits=5,decimal_places=2,null=True,blank=True,help_text="Percentage change in total trading volume")

    gainers_count = models.IntegerField(help_text="Number of stocks that gained value")

    losers_count = models.IntegerField(help_text="Number of stocks that lost value")
    # Using auto_now=True ensures this field is updated every time the object is saved
    last_updated = models.DateTimeField(auto_now=True,help_text="Timestamp of the last update for market overview data")

    class Meta:
        verbose_name = "Market Overview"
        verbose_name_plural = "Market Overviews"

    def __str__(self):
        return f"Market Overview - {self.last_updated.strftime('%Y-%m-%d %H:%M')}"

