# Angular Material Notes

## Card Content Padding

When using `<mat-card-content>` as the last element inside a `<mat-card>`, it automatically adds bottom padding according to Material Design guidelines.

A common issue is that if the last child element inside `<mat-card-content>` (e.g., a `<p>` tag) also has a `margin-bottom`, it results in excessive and uneven spacing at the bottom of the card.

**Solution:**

To fix this, we can use a CSS pseudo-selector to target the last child and remove its bottom margin. This ensures the padding is determined solely by `<mat-card-content>`, creating a balanced look.

This was applied to our `.chapter-content` paragraphs:

```css
.chapter-content p:last-child {
  margin-bottom: 0;
}
```
