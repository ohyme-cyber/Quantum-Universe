---
title: Feynman-Kitaev Clock Formalism (Discrete & Continuous)
date: 2026-01-28
tags:
  - Feynman-Kitaev-Clock
  - Minimal-M
---
# Feynman-Kitaev Clock Formalism: 从离散到连续的映射

## 1. 核心思想 (Core Intuition)
**Feynman-Kitaev Clock Formalism** 的本质是将一个**随时间演化**的量子过程映射为一个**静态**的多体 Hamiltonian 系统的基态问题。
* **物理图像**：将“时间”维展开为一个额外的空间维度（Clock Register）。
* **目标**：构造一个 Hamiltonian $H$，使得系统的 **History State** $|\eta\rangle$ 恰好是 $H$ 的零能基态。

---

## 2. 离散情形 (Discrete Time)

在离散量子线路（共 $T$ 步）中，全系统空间为 $\mathcal{H}_{total} = \mathcal{H}_{work} \otimes \mathcal{H}_{clock}$。

### 历史态 (History State)
$$|\eta\rangle = \frac{1}{\sqrt{T+1}} \sum_{t=0}^{T} |\psi_t\rangle_{work} \otimes |t\rangle_{clock}$$
其中 $|\psi_t\rangle = U_t U_{t-1} \dots U_1 |\psi_0\rangle$ 是第 $t$ 步的演化态。



### Hamiltonian 构造
总 Hamiltonian $H = H_{init} + H_{prop} + H_{final}$：

1. **$H_{init}$ (初始化检查)**：惩罚 $t=0$ 时非初始态的分量。
2. **$H_{prop}$ (传播项)**：核心部分，强制相邻时钟步之间的演化符合 $U_t$。
   $$H_t = -\frac{1}{2} \left( U_t \otimes |t\rangle\langle t-1| + U_t^\dagger \otimes |t-1\rangle\langle t| - I \otimes |t\rangle\langle t| - I \otimes |t-1\rangle\langle t-1| \right)$$
3. **$H_{final}$ (末态检查)**：用于 [[QMA-completeness]] 的判定，检查 $t=T$ 时的输出。

---

## 3. 连续情形 (Continuous & Floquet)

对于周期性驱动系统 $H(t) = H(t+T)$，离散的 $t$ 变为连续坐标 $t \in [0, T)$，这与 **Sambe Space** 理论完美契合。

### 扩展希尔伯特空间 (Sambe Space)
定义 $\mathcal{K} = \mathcal{H}_{sys} \otimes L^2(S^1)$。

### 连续传播算符 (Floquet Operator)
在连续极限下，$H_{prop}$ 演变为如下静态算符（准能量算符）：
$$Q = H(t) - i \frac{\partial}{\partial t}$$
* **$-i \partial_t$**：时钟的“动能项”，充当时间演化的驱动力。
* **准能量 (Quasi-energy)**：$Q |\Psi\rangle\rangle = \epsilon |\Psi\rangle\rangle$。



---

## 4. 测量与 Target State 提取

要从静态的 $|\eta\rangle$ 中提取特定时刻 $t^*$ 的演化结果，必须对 Clock 寄存器进行测量：

1. **测量基组**：在 $\{|t\rangle\}$ 基组下测量 Clock。
2. **波函数坍缩**：测量得到结果 $t^*$ 后，工作寄存器自动坍缩到 $|\psi_{t^*}\rangle$。
3. **代价**：成功概率为 $P(t^*) = 1/(T+1)$，通常需要 **Post-selection**（后验选择）。
---


![[46e0d4f9d3b720d33fb682e33d745d90.jpg]]