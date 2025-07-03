# admin.py
from django.contrib import admin
from .models import Stock, NewsArticle, MarketOverview, UserProfile

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'company_name', 'exchange', 'current_price', 'percent_change', 'last_updated')
    list_filter = ('exchange', 'last_updated')
    search_fields = ('symbol', 'company_name')

# admin.site.register(Stock, StockAdmin)

@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'status', 'last_modified')
    list_filter = ('status', 'published_date', 'author')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    filter_horizontal = ('related_stocks',)

# admin.site.register(NewsArticle, NewsArticleAdmin)

@admin.register(MarketOverview)
class MarketOverviewAdmin(admin.ModelAdmin):
    list_display = (
        'nepse_index', 'nepse_index_change', 'nepse_index_percent_change',
        'total_market_cap', 'market_cap_change', 'market_cap_percent_change',
        'volume_traded', 'volume_traded_change', 'volume_traded_percent_change',
        'gainers_count', 'losers_count', 'last_updated'
    )
    ordering = ('-last_updated',)
    readonly_fields = ('last_updated',)

# admin.site.register(MarketOverview, MarketOverviewAdmin)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio')
    search_fields = ('user__username', 'bio')

# admin.site.register(UserProfile, UserProfileAdmin)
