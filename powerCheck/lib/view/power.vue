<template>
    <div id="powercard">
        <div class="powercardborder">
            <div class="powercardencounter">

                <input v-model="powerName" class="powername" placeholder="name"></input>
                <!-- <span class="powerlvl">阿戈拉隆德的欣布后继者攻击&nbsp;11</span> -->
            </div>
            <table class="details">
                <tbody>
                    <tr>
                        <th>攻击：</th>
                        <td>
                            <ElInput v-model="attackBonus" style="width: 50px" size="small" placeholder="命中加值">
                            </ElInput>

                            vs.

                            <div v-for="target of enemyList" style="display: inline;padding:2px"
                                v-on:click="editTargetHandle(target)">
                                <ElTag style="width: 30px" size="small"> {{ target.defense }}</ElTag>
                            </div>

                            <button @click="enemyList.push({})">+</button>
                        </td>
                    </tr>
                    <tr>
                        <th>命中：</th>
                        <td>
                            <div v-if="hitEffectList.length != 0">
                                <div v-for=" childActive of hitEffectList">
                                    <!-- <Power :data="node"></Power> -->
                                    <button>{{childActive?.name}}</button>
                                    <button>remove</button>

                                </div>
                            </div>

                            <button @click="hitEffectList.push({name:'次攻击'})">+</button>
                        </td>
                    </tr>
                    <tr>
                        <th>失手：</th>
                        <td>
                            <div v-if="missEffectList.length != 0">
                                <div v-for=" childActive of missEffectList">
                                    <!-- <Power :data="node"></Power> -->
                                    <button>{{childActive?.name}}</button>
                                    <button>remove</button>

                                </div>
                            </div>

                            <button @click="missEffectList.push({name:'次攻击'})">+</button>
                        </td>
                    </tr>
                    <tr>
                        <th>效果：</th>
                        <td>
                            <div v-if="alwaysEffectList.length != 0">
                                <div v-for=" childActive of alwaysEffectList">
                                    <!-- <Power :data="node"></Power> -->
                                    <button>{{childActive?.name}}</button>
                                    <button>remove</button>

                                </div>
                            </div>

                            <button @click="alwaysEffectList.push({name:'次攻击'})">+</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    </div>
    <ElDialog v-model="targetDialogShow" :width="300">
        <div> <span>类型:</span>
            <select v-model="enemyObject.type">
                <option value="蛮战">蛮战</option>
                <option value="护卫">护卫</option>
                <option value="游击">游击</option>
                <option value="伏兵">伏兵</option>
                <option value="远程">远程</option>
                <option value="控制">控制</option>
                <option value="领导">领导</option>
            </select>
        </div>
        <div> <span>lv:</span>
            <ElInput v-model="enemyObject.lv"> </ElInput>
        </div>
        <div> <span>防御:</span>
            <ElInput v-model="enemyObject.defense"> </ElInput>
        </div>
        <!-- <ElButton @click="addTarget">添加</ElButton> -->
        <ElButton @click="targetDialogShow = false">确定</ElButton>
        <ElButton @click="removeTarget">移除</ElButton>
    </ElDialog>
    <ElDialog v-model="modifierDialogShow" :width="300">
        <div> <span>类型:</span>
            <ElInput v-model="modifierObject.type"></ElInput>
        </div>
        <div> <span>值:</span>
            <ElInput v-model="modifierObject.value"> </ElInput>
        </div>
        <ElButton @click="addModifier">添加</ElButton>
    </ElDialog>
</template>
<script lang="ts" setup name="Power">
import { ref } from 'vue';
import { Modifier } from "../class/Modifier"
import { Enemy } from "../class/Enemy"
import { ElDialog, ElInput, ElButton, ElTag } from "element-plus"
const props = defineProps({
    data: {
        type: Object,
        default: () => {
            return {}
        }
    },
})
const powerName = ref('')
const targetDialogShow = ref(false)
const enemyObject = ref({ type: '', lv: 0 } as Enemy)
const enemyList = ref([] as Enemy[])

const modifierDialogShow = ref(false)
const modifierObject = ref({ type: '', value: 0 } as Modifier)
const modifierList = ref([] as Modifier[])
// const children = props.children
const attackBonus = ref(0)

const addModifier = () => {
    let modifier = { type: '', value: 0 } as Modifier
    modifier = Object.assign(modifier, modifierObject.value)
    modifierList.value.push(modifier)
    modifierObject.value = { type: '', value: 0 }
    modifierDialogShow.value = false
}
const editTargetHandle = (target: Enemy) => {
    targetDialogShow.value = true
    enemyObject.value = target
}
const removeTarget = (target: Enemy) => {
    let index = 0;
    for (let tempIndex in enemyList.value) {
        if (enemyList.value[tempIndex] == target) {
            index = tempIndex as any as number
        }
    }
    enemyList.value.splice(index, 1);
    targetDialogShow.value = false
}


const hitEffectList = ref([] as any[])
const missEffectList = ref([] as any[])
const alwaysEffectList = ref([] as any[])
</script>