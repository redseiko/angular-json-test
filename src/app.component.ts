import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';

interface Chapter {
  title: string;
  content: string[];
}

interface Story {
  title: string;
  author: string;
  chapters: Chapter[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  
  readonly story = signal<Story | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      // Use the fetch API to load the JSON file from its new nested directory.
      const response = await fetch('src/stories/the-princess/story.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch story.json: ${response.status} ${response.statusText}`);
      }
      const data: Story = await response.json();
      this.story.set(data);
    } catch (e) {
      console.error('Failed to load story data:', e);
      this.error.set('Could not load story data. Please check the console for more information.');
    } finally {
      // Simulate a small delay for a better loading experience
      setTimeout(() => {
        this.loading.set(false);
      }, 500);
    }
  }
}