<template>
    <div class="context-menu context-menu-container"
         :class="openPosition"
         v-if="visible"
         :style="contextMenuPosition"
         v-click-outside="close" @click="close"
         ref="contextMenu"
    >
        <ul>
            <context-menu-item
                    v-for="(menuItem, index) in menuItems"
                    :item="menuItem"
                    :key="index">
            </context-menu-item>
        </ul>
    </div>
</template>

<script>
/* eslint-disable prefer-destructuring */

import ContextMenuItem from './ContextMenuItem.vue';
import ClickOutside from '../directives/ClickOutside';

/**
 * A simple context menu component
 *
 * ```html
 * <ContextMenu :menu-items="[....]"/>
 * ```
 */
export default {
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      visible: false,
      contextMenuPosition: {
        top: 0,
        left: 0,
      },
      openPosition: 'context-menu-open-right',
    };
  },

  methods: {
    close() {
      this.visible = false;
    },

    /**
     * Accepts an Object with an `x, y` position or an instance of Event
     */
    open(position) {
      this.visible = true;

      this.$nextTick(() => {
        let x = 0;
        let y = 0;

        if (typeof position !== 'undefined' && typeof position === 'object') {
          if (position instanceof Event) {
            const windowWidth = window.innerWidth;
            const contextMenuWidth = this.$refs.contextMenu.getBoundingClientRect().width;

            if (position.pageX >= (windowWidth - contextMenuWidth)) {
              this.openPosition = 'context-menu-open-left';
              x = windowWidth - contextMenuWidth - 10;
            } else {
              this.openPosition = 'context-menu-open-right';
              x = position.pageX;
            }

            y = position.pageY;
          } else {
            x = position.x;
            y = position.y;
          }
        }

        this.contextMenuPosition = {
          left: `${x}px`,
          top: `${y}px`,
        };
      });
    },
  },

  components: {
    'context-menu-item': ContextMenuItem,
  },

  directives: {
    'click-outside': ClickOutside,
  },
};
</script>

<style lang="scss">
    $context-menu-border-radius: 4px;

    .context-menu-container {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        font-size: .8em;
        position: absolute;
        user-select: none;
        z-index: 100;
    }

    .context-menu {
        background: #e4e4e4;
        border-radius: $context-menu-border-radius;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

        ul {
            margin: 0;
            padding: 0;
            list-style: none;

            :first-child {
                border-top-right-radius: $context-menu-border-radius;
                border-top-left-radius: $context-menu-border-radius;
            }

            :last-child {
                border-bottom-right-radius: $context-menu-border-radius;
                border-bottom-left-radius: $context-menu-border-radius;
            }

            li {
                position: relative;
                padding: .5em 1em;
                cursor: pointer;

                .label {
                    display: flex;
                    justify-content: space-between;
                    white-space: nowrap;

                    .item-label {
                        margin-right: 1em;
                    }
                }

                &.item-disabled {
                    cursor: not-allowed;
                    opacity: 0.3;
                }

                ul {
                    display: none;
                }

                &:hover {
                    background: rgba(0, 0, 0, 0.1);
                    > ul {
                        position: absolute;
                        left: calc(100% + 2px);
                        top: 0;
                        display: block;
                        min-width: 100%;
                    }
                }
            }
        }

        &.context-menu-open-left {
            ul {
                li {
                    &:hover {
                        > ul {
                            left: auto;
                            right: calc(100% + 2px);
                        }
                    }
                }
            }
        }
    }
</style>
